const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose
    .connect(keys.mongodb.dbURI || process.env.dbURI).then(() =>{
        console.log("Connected to MongoDB");
}).catch(err =>{
    console.log(err);
});

exports.User = require("./user");