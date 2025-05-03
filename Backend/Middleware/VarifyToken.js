import jwt from 'jsonwebtoken'
import websiteUser from '../Model/UserModel.js';


export const fetchAuthUser = async(req,res,next)=>{

  try {
    
  const token = req.cookies.token

  if(!token){
    return   res.status(400).json({message:'Token is not provided'})
  }

  const decoded =  jwt.verify(token,process.env.JWT_SECRET);

  if(!decoded){
    return res.status(400).json({message:'Token is not vailid'})
  }

  const user = await websiteUser.findById(decoded.id).select('-password');
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  req.user = user;
  next();

} catch (error) {

  console.error('Auth middleware error:', error.message);
  return   res.status(401).json({ message: 'Unauthorized' });

}

}