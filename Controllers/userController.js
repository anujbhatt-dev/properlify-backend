const User = require("../models/userSchema");
const bcrypt = require('bcrypt');

// exports.getSignup = (req,res)=>{
//    res.render('signup.ejs');
// };

exports.postSignup = async (req,res)=>{
    try {
        const {name,email,password,accountType,phoneNumber} = req.body;
        const hashpassword = await bcrypt.hash(password,10);
        const newuser = new User({
            name,
            email,
            password:hashpassword,
            accountType,
            phoneNumber,
        });
        await newuser.save();
        console.log(newuser);
        res.send(newuser);
     } catch (error) {
        console.log(error);
        res.status(400).json('Internal Server error');
    }
};

// exports.getLogin = (req,res)=>{
//     res.render('login.ejs');
// };

// exports.postLogin = async(req,res)=>{
//  try {
//      const email = req.body.email;
//      const password = req.body.password;

//      const userData = await User.findOne({email:email});
//      if(userData){
//         const matchpassword =await bcrypt.compare(password,userData.password);
//         if(matchpassword){
//             req.session.User = userData;
//             return res.send(userData);
//         }
//         res.status(400).send({message:"something went wrong"})
//      }
//  } catch (error) {
//     console.log(error);
//     res.status(400).send('Internal Server Error');
//  }
// };

exports.postLogin = async (req, res) => {
  try {
      const email = req.body.email;
      const password = req.body.password;

      const userData = await User.findOne({ email: email });
      if (userData) {
          const matchpassword = await bcrypt.compare(password, userData.password);
          if (matchpassword) {
              // Only send necessary user data in the response
              
              req.session.User = userData;
              console.log(req.session.User);
              console.log(req.session);
              return res.json(userData);
          }
          res.status(400).json({ message: "Invalid email or password" });
      } else {
          res.status(404).json({ message: "User not found" });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json('Internal Server Error');
  }
};


exports.Logout=(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
          console.error(err);
          res.status(500).json('Internal Server Error');
        } else {
          res.redirect('/login');
        }
      });
}

// exports.getDashboard= async (req,res)=>{
//     try{
//       const users = await User.findById();
//       res.render('dashboard',{user:req.session.User,users,groups});
//     }catch(error){
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// }
