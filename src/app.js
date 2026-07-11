const express = require('express');

const app = express();


app.get("/getAllData", (req, res, next) => {
    try{
        throw new Error("This is a test error");
        res.send("Get all data");
    }catch(err){
        res.status(500).send("Something went wrong!");
    }
})


app.use("/",(err, req, res, next) => {
    if(err){
        res.status(500).send("Something broke!");
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});