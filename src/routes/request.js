const express = require("express");
const {authAdmin} = require("../middlewares/auth");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/sendConnection", authAdmin, async (req, res) => {

    try{
        res.send(req.user.firstName + " has sent you a connection");
    }catch(err){
        res.status(400).send("Error" + err);
    }
});


requestRouter.get("/feed", async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    }catch(err){
        res.status(400).send("User fetching failed:" + err);
    }
})

module.exports = requestRouter;