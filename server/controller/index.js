const { MongoClient } = require("mongodb");
const url="mongodb+srv://naveen:reliance@cluster0.1zo1yba.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
const ejs= require('ejs')
const path = require('path')
const bcrypt = require('bcrypt')

exports.getLandingPage = (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../../interface/index.html" ));
}
exports.signup = async (req, res)=>{
  const { name, email, phone, dob, address, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user={
    name,
    email,
    phone,
    dob,
    address,
    hashedPassword
  }
  try{
    await client.connect();
    console.log("Successfully connected to mongodb atlas");
    const db = client.db("Cluster0");
    const collection = db.collection("users");
    const result = await collection.insertOne(user);
    res.status(200).send("hello")
    await client.close();
  }
  catch(err){
     console.log(err);
  }
}

exports.login = async (req, res) => {

  try{
    await client.connect();
    console.log("Successfully connected to mongodb atlas");
    const db = client.db("Cluster0");
    const collection = db.collection("users");
    
    const {email, password}= req.body;
    const user = await collection.findOne({email: email})


    const match = await bcrypt.compare(password, user.hashedPassword);
    if(match){

      res.redirect('/dashboard/'+email)
      
    }
  }
  catch(err){
    console.log(err);
  }
  await client.close();
  
};
exports.showDashboard= async (req , res)=>{

  try{
    await client.connect();
    const db = client.db("Cluster0");
    const users = db.collection("users");
    const email = req.params.email;
    console.log(email)
    const user = await users.findOne({ email: email });
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