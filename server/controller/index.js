const { MongoClient } = require("mongodb");
const url="mongodb+srv://naveen:reliance@cluster0.1zo1yba.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
const ejs= require('ejs')
const path = require('path')
const bcrypt = require('bcrypt')
const model= require('../models/index')
const User = model.User;
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://naveen:reliance@cluster0.1zo1yba.mongodb.net/?retryWrites=true&w=majority")

exports.getLandingPage = (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../../interface/index.html" ));
}
exports.signup = async (req, res)=>{

  const { name, email, phone, dob, address, password} = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
   const user = new User({
    name,
    email,
    phone,
    dob,
    address,
    hashedPassword: hashedPassword // Store the hashed password
  })
  user.save()
  res.redirect('/login.html')


}

exports.login = async (req, res) => {

  try{
    const {email, password}= req.body;
    const user = await User.findOne({email: email})


    const match = await bcrypt.compare(password, user.hashedPassword);
    if(match){

      res.redirect('/dashboard/'+email)
      
    }
    else{
      res.send('<h1>Wrong Credentials<h1>')
    }
  }
  catch(err){
    res.status(400).send(err);
  }

  
};
exports.showDashboard= async (req , res)=>{

  try{

    const email = req.params.email;

    const user = await User.findOne({email: email})
    console.log(user)

    ejs.renderFile(path.resolve(__dirname, '../../interface/dashboard.ejs'), {user},function(err, str){
       res.send(str)
  })
    
  }
  catch(err){
    console.log(err);
  }
  // return res.status(200).sendFile(path.join(__dirname, "../../interface/dashboard.html" ));
  
  await client.close();

}