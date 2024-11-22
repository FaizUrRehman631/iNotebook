const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Shadowwalker";

// Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),

] , async (req,res)=>{
    // If there are errors, return bad requests and that errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    // Chech whether the user with this email exists already
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error: "Sorry the user with this email already exists"})
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user 
     user = await User.create({
        // write here as well as written in User.js so that data will show in db without any error
        name: req.body.name,
        email: req.body.email,
        password:secPass,
        gender:req.body.gender,
        city:req.body.city,
        country:req.body.country,
        province:req.body.province,
        district:req.body.district,
        nationality:req.body.nationality
    })
    // send user in mongodb
    const data ={
        user:{
            id: user.id
        }
    }
    // used JWT 
    const authtoken= jwt.sign(data, JWT_SECRET)
    // res.json(user)
    res.json({authtoken})
    // If error occured in server then show the status 500
    // catch errors
} catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
}
});
module.exports=router