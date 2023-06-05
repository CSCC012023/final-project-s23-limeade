import { Router } from "express";
import { User } from "../models/users.js";
import bcrypt from "bcrypt";

export const usersRouter = Router();

usersRouter.post("/signup",async (req,res)=>{
    const plaintextPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plaintextPassword,salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        password:hashedPassword,
    });

    try {
        await user.save();

    }
    catch{
        return res.status(422).json({error:"user creation failed"});
    }

    return res.json(user);


});

usersRouter.post("/signin",async (req,res)=>{
    return res.json();
})