const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{

    res.json([])
});
module.exports=router;


// Use express.Router when your application grows and you need to organize routes into smaller, manageable modules.
// Helps in modularizing route logic for different parts of your app (e.g., users, products, etc.).