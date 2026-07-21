const express = require("express");
const User = require("../models/user");
const { authAdmin } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

const SAFE_DATA = "firstName lastName age gender skills photoUrl"

userRouter.get("/user/requests/received", authAdmin,  async (req, res) => {

    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", SAFE_DATA);
        // }).populate("fromUserId", ["firstName", "lastName"]); // another way
       
        res.status(200).json({ message: "ok", data: connectionRequests});
    }catch(err){
        res.status(400).send("User update failed:" + err);
    }
})

userRouter.get("/user/connections", authAdmin,  async (req, res) => {

    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser.id, status: "accepted"},
                { toUserId: loggedInUser.id, status: "accepted"}
            ]
        }).populate("fromUserId", SAFE_DATA).populate("toUserId", SAFE_DATA);

        const data = connectionRequests.map( connection => {
            if(connection.fromUserId._id.toString() === loggedInUser._id.toString()){
                return connection.toUserId;
            }else{
                return connection.fromUserId;
            }
        })

       
        res.status(200).json({ message: "ok", data: data});
    }catch(err){
        res.status(400).send("User update failed:" + err);
    }
})


userRouter.get("/user/feed", authAdmin,  async (req, res) => {

    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;
        

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser.id},
                { toUserId: loggedInUser.id}
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();

        connectionRequests.forEach((connection) => {
            hideUserFromFeed.add(connection.fromUserId.toString());
            hideUserFromFeed.add(connection.toUserId.toString());
        })

        const users = await User.find({
           $and: [  {_id: { $nin: Array.from(hideUserFromFeed)}}, { _id: {$ne: loggedInUser._id} }]
        }).select(SAFE_DATA).skip(skip).limit(limit);

       
        res.status(200).json({ message: "ok", data: users});
    }catch(err){
        res.status(400).send("User update failed:" + err);
    }
})

module.exports = userRouter;