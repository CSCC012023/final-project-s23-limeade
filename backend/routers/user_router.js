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
    user.message = "login successful";
    return res.json(user);
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
});

usersRouter.get("/getMe",isAuthenticated,async(req,res)=>{
    const user = await User.findOne({
        _id:req.session.userId
    });
    if(!user){
        return res.status(404).json({error:"User not found"});
    }

    user.password = null;
    return res.json(user);
}
)

usersRouter.get('/id=:id',isAuthenticated,async(req,res)=>{
    const user = await User.findOne({
        _id:req.params.id
    });
    if(!user){
        return res.status(404).json({error:"User not found"});

    }

    user.password = null;
    return res.json(user);
});

usersRouter.patch("/profile",isAuthenticated,async(req,res)=>{
    const interests = req.body.interests;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userId = req.body.userId;
    if(req.session.userId !== userId){
        return res.status(401).json({error:"Only allowed to change your own profile"});
    }

    const user = await User.findOne({
        _id:userId
    });

    if(!user){
        return res.status(404).json({error:"User not found"});

    }

    user.interests = interests;
    user.firstName = firstName;
    user.lastName = lastName;
    user.save();
    return res.json({message:"save complete"});




});

usersRouter.patch("/block",isAuthenticated,async (req, res)=>{
    const blockedUserId = req.body.blockedUserId;
    if(blockedUserId === req.session.userId){
        return res.status(401).json({
            error:"Cannot block yourself"
        })
    }
    const me = await User.findOne({
        _id:req.session.userId
    });

    if(me.blocked.indexOf(blockedUserId)=== -1){
        me.blocked.push(blockedUserId);
    }


    try{
        me.save();
    }
    catch{
        return res.status(422).json({error:"Blocked didn't work"});
    }
    return res.json({message:"block successful"});

});

  