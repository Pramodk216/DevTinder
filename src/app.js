const express = require('express');

const app = express();



// This will handle only GET requests to the /user path
app.get("/user",  (req,res) => {
    res.send({name: "John", age: 20});
})

// This will handle only POST requests to the /user path
app.post("/user",  (req,res) => {
    res.send("User created successfully");
})

// This will handle only DELETE requests to the /user path
app.delete("/user",  (req,res) => {
    res.send("User deleted successfully");
})

// This will handle all HTTP requests(GET, POST, DELETE, etc.) that are made to the /test path
app.use("/test",  (req,res) => {
    res.send("This is a test page");
})

app.use("/",  (req,res) => {
    res.send("Hello NodeJs!");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});