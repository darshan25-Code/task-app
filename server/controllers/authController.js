const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
 try{
     const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword =await bcrypt.hash(password,10)

  const user = await User.create({
    name ,
    email,
    password : hashedPassword
  })

  return res.status(201).json({
    message : "User created succcessfully",
    user
  })
 }catch(error){
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  
 }
};

const loginUser =async (req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }
    
    const isMatch =await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const token = jwt.sign({id : user._id},process.env.JWT_SECRET)

  res.cookie("token", token);

return res.status(200).json({
  message: "Login Successful",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

   
}

const logoutUser = (req,res)=>{
    res.clearCookie("token");

    return res.status(200).json({
      meassage : "User logout Successfully"
    })
}


module.exports = { registerUser,loginUser,logoutUser}