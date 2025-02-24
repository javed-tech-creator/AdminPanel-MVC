const User = require('../Model/User')
const bcrypt = require('bcrypt')

//signup user api
const signupUser = async(req, res) => {
  try {
    
  const { name, email,password } = req.body;
 const hashedPassword = await bcrypt.hash(password,5);

  if (!name || !email || !password) {
      return res.status(400).json({ message: "Name , email and password are required" });
  }

  const newUser = new User({
    name,
    email,
    password:hashedPassword 
  })
  const Data = await newUser.save();
  res.status(201).json({message:'User Signup Succcessfully',Data})

} catch (error) {
  return res.status(500).json({message:'Network error during Signup',error})

    
}

};

//login user api
const loginUser = async(req,res)=>{
  try {
    const {email,password} = req.body

    const isEmail = await User.findOne({email})
    if(!isEmail){
      return res.status(404).json({message:'User Email Not Found'})
    }
    
    const isMatchPassword = await bcrypt.compare(password,isEmail.password)

    if(!isMatchPassword){
      return res.status(400).json({message:'Password are Incorrect'})
    }
  
    res.status(201).json({message:'Login Successfull'})

  } catch (error) {
    res.status(500).json({message:'Internal Network Error During login',error})
  }
}


module.exports = {signupUser,loginUser}