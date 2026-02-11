const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
/*
Checks:
- token exists
- token is valid
-used for user to get accesss in comments 
*/
const authMiddleware = async (req,res,next)=>{
  try{    
  let token;

    // token will come in header like:
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
    return res.status(401).json({message:"No token provided"}); 
    }
  // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded contains payload: { id, role }
    // fetch user from DB to confirm user still exists
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // attach user data to request
    req.user = user;

    next();
  }catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;