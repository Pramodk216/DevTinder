const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {

    console.log(req.body);

    
   const user = new User(req.body);

   try{
    await user.save();
    res.send("User created successfully");
   }catch(err){
    res.status(400).send("User creation failed:", err);
   }
});

connectDB().then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log("MongoDB connection failed");
});