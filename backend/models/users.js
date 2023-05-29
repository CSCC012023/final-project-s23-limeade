import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        required:true,
        type:String,
    },
    lastName:{
        required:true,
        type:String,
    },
    type:{
        type:String,
        enum:['basic','premium'],
        required:true
    },
});

export const User = mongoose.model ("User",userSchema);