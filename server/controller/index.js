const path = require('path')
const bcrypt = require('bcrypt')

exports.getLandingPage = (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../../interface/index.html" ));
}
exports.signup = (req, res)=>{
  console.log(req.body)
  const { name, email, phone, DOB, address, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user={
    name,
    email,
    phone,
    DOB,
    address,
    hashedPassword
  }
  console.log(user)
  console.log(hashedPassword)
}

// exports.signup = async (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 10);
//   if (!username || !email || !password) {
//     return res.status(400).send("Please fill in all fields.");
//   }
//   try {

//     await client.connect();
//     console.log("Successfully connected to mongodb atlas");
//     const db = client.db("Cluster0");
//     const collection = db.collection("users");
//     const user = {
//       username,
//       email,
//       hashedPassword,
//     };
//     console.log(user);
//     const result = await collection.insertOne(user);
//     console.log("Result got saved with id_" + result.insertedId);
//     await client.close();
//   } catch (err) {
//     console.log(err);
//   }
//   res.redirect("/loginform");
// };