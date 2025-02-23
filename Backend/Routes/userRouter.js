const express = require('express')
const router = express.Router();
const User = require('../Model/User')


router.post('/submit',async(req, res) => {
  try {
    
  const { name, email,password } = req.body;

  if (!name || !email || !password) {
      return res.status(400).json({ message: "Name and email are required" });
  }

  const newUser = new User({name, email,password})
  const Data = await newUser.save();
 return res.status(201).json({message:'Saved Succcessfully',Data})

} catch (error) {
  return res.status(500).json({message:'Network error',error})

    
}

});

module.exports = router