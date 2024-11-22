const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async()=>{
     await mongoose.connect(mongoURI)
    console.log("Connected to Mongoose Successfully");
}

module.exports= connectToMongo;

// Mongodb connection using Mongoose and Nodemon