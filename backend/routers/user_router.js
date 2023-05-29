import { Router } from "express";
import { User } from "../models/users.js";

export const usersRouter = Router();

usersRouter.post("/signup",async (req,res)=>{

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type
    });

    try {
        await user.save();

    }
    catch{
        return res.status(422).json({error:"user creation failed"});
    }

    res.json(user);


})