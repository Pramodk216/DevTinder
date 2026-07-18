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

        if(fromUserId.toString() === toUserId.toString()){
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

requestRouter.post("/request/review/:status/:requestId", authAdmin, async (req, res) => {

    try{

        const loggedInUser = req.user;
       
        const { status, requestId} = req.params;
        
        const validStatus = ["accepted", "rejected"];

        if(!validStatus.includes(status)){
            return res.status(400).json({ message: `InValid action: ${status}`});
        }


        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })

        if(!connectionRequest){
            return res.status(400).json({ message: "Connection requeat is not present"});
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({ 
            message: "connection request accepted",
            data: data
        });

    }catch(err){
        res.status(400).send("Error" + err);
    }
});

module.exports = requestRouter;