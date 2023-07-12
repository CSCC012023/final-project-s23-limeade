import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: String,
    senderUsername:String,
    text: String,
    timestamp: { type: Date, default: Date.now }
  });
  
  // Create a schema for rooms
  const roomSchema = new mongoose.Schema({
    name: String,
    messages: [messageSchema]
  });
  
  // Create a model based on the room schema
export const Room = mongoose.model('Room', roomSchema);