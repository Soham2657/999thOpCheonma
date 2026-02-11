const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser);//http://localhost:5000/api/users/register
router.post("/login", loginUser);//http://localhost:5000/api/users/login

module.exports = router;
