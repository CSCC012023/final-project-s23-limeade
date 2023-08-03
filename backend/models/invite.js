import mongoose, { mongo } from "mongoose";

const inviteSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "limeEvent",
  },
  inviterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  invitedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Invitation = mongoose.model("Invitation", inviteSchema);
