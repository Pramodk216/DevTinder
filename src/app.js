const express = require('express');

const app = express();

app.use("/",  (req,res) => {
    res.send("Hello NodeJs!");
})


app.use("/hello",  (req,res) => {
    res.send("Hello World!");
})

app.use("/test",  (req,res) => {
    res.send("This is a test page");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});