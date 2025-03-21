const User = require('../Model/AdminModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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

    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message:'User Email Not Found'})
    }
    
    const isMatchPassword = await bcrypt.compare(password,user.password)

    if(!isMatchPassword){
      return res.status(400).json({message:'Password are Incorrect'})
    }
    
    const token = jwt.sign(
      {userId:user._id,
        email:user.email
       },
       process.env.SECRET_KEY,
       {expiresIn:"1h"}
    )

    res.status(201).json({message:'Login Successfull',token})

  } catch (error) {
    res.status(500).json({message:'Internal Network Error During login',error})
  }
}


module.exports = {signupUser,loginUser}