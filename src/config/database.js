const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://pramodk_db_user:NMy2el2yyuaY1K2Z@pramod-mongodb.adhzwcp.mongodb.net/devTinder");
}

module.exports = connectDB;