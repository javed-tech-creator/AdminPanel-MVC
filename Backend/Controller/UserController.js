import bcrypt from'bcryptjs';
import websiteUser from '../Model/UserModel.js';
import jwt from 'jsonwebtoken';

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'jsonwebtokensecret';

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await websiteUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new websiteUser({
      name,
      email,
      password: hashedPassword
    });
    const userSave = await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ===== Login =====
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await websiteUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '1d'
    });


    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // false for local, true for production
      sameSite:'none', // 'lax' allows local dev to work
      maxAge: 24 * 60 * 60 * 1000
    });
    
    

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyToken = async(req,res)=>{

  const user = req.user;
  try {

    res.status(200).json({message:'User is Authorized',user})

  } catch (error) {
    
    res.status(500).json({message:'Internal Error',error})
  
  }

}

const userLogout = async(req,res)=>{

try {
  res.clearCookie('token', {
    httpOnly: true,
      secure: true, // false for local, true for production
      sameSite: 'none', // 'lax' allows local dev to work
  });

  res.status(200).json({message:"Logout Successfull"})
  
} catch (error) {
  res.status(500).json({message:"Error During Logout",error})
}

}

export {userLogin,userSignup,userLogout,verifyToken}