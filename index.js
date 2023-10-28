const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('interface'));
app.use(express.static('interface/img'));

// GETTING ROUTES
const userRoutes = require('./server/routes/index.js');
app.use('/', userRoutes);

//CALLING SERVER
app.listen(port, ()=>{
    console.log(`Server Started on port ${port}`)
})