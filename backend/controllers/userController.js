const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

/*
REGISTER USER
- checks if email already exists
- hashes password
- stores user in DB
*/


exports.registerUser=async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    //check if user already exists
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    //hash password
    const hashedPassword=await bcrypt.hash(password,10);
    //create user
    const user=await User.create({name,email,password:hashedPassword,role:"user"});

    res.status(201).json({message:"User registered successfully",user:{id:user._id,name:user.name,email:user.email,role:user.role},
    token:generateToken({id:user._id,role:user.role})});//generating token after registration to directly get access of the app after first time registration

    }catch(error){
        next(error);    
    }

}
/*
LOGIN USER
- checks email exists
- compares hashed password using bcrypt
- generates JWT token
*/
exports.loginUser=async (req,res,next)=>{
    try{
        const {email,password}=req.body;

    //checks if email and password are provided
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});   
    }
//check if user exists
const user=await User.findOne({email});
if(!user){
    return res.status(400).json({message:"Invalid credentials"});
}
//compare password
const ismatch= await bcrypt.compare(password,user.password);
if(!ismatch){
    return res.status(400).json({message:"Invalid credentials"});

}
 res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken({ id: user._id, role: user.role }),
    });
  } catch (err) {
    next(err);
  }

}
