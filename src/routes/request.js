const express = require("express");
const {authAdmin} = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", authAdmin, async (req, res) => {

    try{

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        
        
        const validStatus = ["ignored", "interested"];

        if(!(validStatus.includes(status))){
            return res.status(400).json({ message: `In valid action: ${status}`});
        }


        if(fromUserId === toUserId){
            return res.status(400).json({ message: "Can't send request to self"});
        }

        const toUser = await User.findById(toUserId);

        if(!toUser){
            return res.status(400).json({ message: "Invid user to send Connection requeat"});
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [{ fromUserId, toUserId}, {fromUserId: toUserId, toUserId: fromUserId}]
        })

        if(existingConnectionRequest){
            return res.status(400).json({ message: "Connection requeat is already present"});
        }

        const connectionRequest = new ConnectionRequest({fromUserId, toUserId, status});

        const data = await connectionRequest.save();

        res.json({ 
            message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
            data: data
        });

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