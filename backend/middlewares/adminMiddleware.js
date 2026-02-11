/*
Allows only admin (me) to create blogs
*/
module.exports = (req, res, next) => {
  console.log("Admin check - User:", req.user);
  console.log("Admin check - Role:", req.user.role);
  
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access denied" });
  }
   else {
    next();
  }
};