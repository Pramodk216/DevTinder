const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/user")
const { validateSignUpData } = require('../utils/validator');

const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {

   try{

    validateSignUpData(req);

    const { email, password, firstName, lastName, gender, age, about, skills } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ email, password: passwordHash, firstName, lastName, gender, age, about, skills });
    await user.save();
    res.send("User created successfully");
   }catch(err){
    res.status(400).send("Error" + err);
   }
});


authRouter.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).send("Invalid email");
        } else{
            const isPasswordCorrect = await user.validatePassword(password);
            if(!isPasswordCorrect){
                return res.status(400).send("Invalid password");
            }else{
                const token = await user.getJWT();
                res.cookie("token", token);
                res.json(user);
            }
        }
    }catch(err){
        res.status(400).send("Error" + err);
    }
});

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, { expiredIn: new Date(Date.now())});
    res.send("Logout Successfully");
});


module.exports = authRouter;