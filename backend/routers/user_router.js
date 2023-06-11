import { Router } from "express";
import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { isAuthenticated } from "../middleware/auth.js";
export const usersRouter = Router();

usersRouter.post("/signup",async (req,res)=>{
    const plaintextPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plaintextPassword,salt);
    const existing = await User.findOne({
        username:req.body.username
    });
    if(existing){
        return res.status(422).json({error:"Username already taken"})
    }
    const user = new User({
        username:req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        password:hashedPassword,
    });

    try {
        await user.save();

    }
    catch(err){
        return res.status(422).json(err);
    }

    return res.json(user);


});

usersRouter.post("/login",async (req,res)=>{
    const user = await User.findOne({
        username:req.body.username
    });
    if(!user){
        return res.status(404).json({error:"Credentials not found"});
    }  

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ error: "Credentials not found" });
    }
    req.session.userId = user._id;
    return res.json({
        message:"Login successful",
        userId:user._id,
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        type:user.type,
    });
})

usersRouter.get('/logout',isAuthenticated, (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session:', err);
      }
      return res.json({message:"Logout successful"});
    });
});

usersRouter.patch("/switchToPremium",isAuthenticated,async (req,res)=>{
    const user = await User.findOne({
        _id:req.session.userId
    });
    if(!user){
        return res.status(404).json({error:"User not found"});
    }

    user.type = 'Premium';

    try{
       await  user.save();
    }
    catch(err){
        return res.status(422).json(err);
    }

    return res.json(user);
})