const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');




router.post('/',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),

] , (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    User.create({
    name: req.body.name,
        email: req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        city:req.body.city,
        country:req.body.country,
        province:req.body.province,
        district:req.body.district,
        nationality:req.body.nationality
    }).then(user => res.json(user))
    .catch(err=>{res.json({error: 'Please enter a unique value for email'})})
});
module.exports=router