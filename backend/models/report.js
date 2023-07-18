import mongoose from "mongoose";


const report = new mongoose.Schema({
    reportedId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    reporterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reportMsg:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
});

export const Report = mongoose.model ('Report',report);