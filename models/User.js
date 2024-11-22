const mongoose = require('mongoose');
const { Schema } = mongoose; // import schema from the documentation
// Schema : means samples, the user data took accordingly 
const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    gender:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    district:{
        type: String,
        required:true
    },
    province:{
        type: String,
        required:true
    },
    nationality:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
  });
const User= mongoose.model('user', UserSchema);
  module.exports = User;
