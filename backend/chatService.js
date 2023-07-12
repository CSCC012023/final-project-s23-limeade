// chatService.js
import { Room } from "./models/room.js";

async function handleChatEvents(io, socket) {
  console.log('A user connected');

  socket.on('join room', async (room) => {
    socket.join(room);
    socket.room = room;
    io.to(room).emit('user joined', socket.id);

    try {
      const foundRoom = await Room.findOne({ name: room });
      if (foundRoom) {
        socket.emit('chat history', foundRoom.messages);
      }
    } catch (error) {
      console.error('Failed to retrieve chat history:', error);
    }
  });

  socket.on('leave room', (room) => {
    socket.leave(room);
    io.to(room).emit('user left', socket.id);
  });

  socket.on('chat message', async (msg) => {
    const userId = socket.request.session.userId;
    const username = socket.request.session.username;
    const message = { sender: userId, senderUsername:username ,text: msg };

    try {
      const updatedRoom = await Room.findOneAndUpdate(
        { name: socket.room },
        { $push: { messages: message } },
        { new: true }
      );
      io.to(socket.room).emit('chat message', message);
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  });

  socket.on('create room', async (room) => {
    try {
      const foundRoom = await Room.findOne({ name: room });
      if (foundRoom) {
        socket.emit('room creation error', 'Room name already exists.');
      } else {
        const newRoom = new Room({ name: room });
        await newRoom.save();
        socket.emit('room created', room);
      }
    } catch (error) {
      console.error('Failed to create room:', error);
      socket.emit('room creation error', 'Failed to create room.');
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    io.to(socket.room).emit('user left', socket.id);
  });
}

export default handleChatEvents;
