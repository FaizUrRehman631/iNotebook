const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



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
     user = await User.create({
    name: req.body.name,
        email: req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        city:req.body.city,
        country:req.body.country,
        province:req.body.province,
        district:req.body.district,
        nationality:req.body.nationality
    })
    // send user in mongodb
    res.json(user)
    // If error occured in server the show the status 500
} catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
}
});
module.exports=router