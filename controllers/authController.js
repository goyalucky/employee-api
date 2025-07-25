import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
           return res.status(404).json({success: false,error: 'User not found'});
        } 
        
        // const isMatch = await bcrypt.compare(password,user.password)
        // console.log(isMatch);
        // if(!isMatch){
        //     return res.status(404).json({success: false ,error: 'Wrong Password'});
        // }

        const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_KEY,{expiresIn: "10d"})

        res.status(200).json({success:true,token,user:{_id:user._id,name:user.name,role:user.role},})

    } catch (error) {
        res.status(500).json({success:false, error: error.message})
    }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'employee'
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_KEY, {
      expiresIn: '10d'
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req,res) => {
    return res.status(200).json({success:true, user: req.user})
}

 

export { login, signup, verify };

