// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const port = 3000;
// const { exec } = require('child_process');

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('interface'));
// app.use(express.static('interface/img'));

// // GETTING ROUTES
// const userRoutes = require('./server/routes/index.js');
// app.use('/', userRoutes);

// // Define a function to open the browser
// const openBrowser = () => {
//     console.log(`Server Started on port ${port}`);
//     exec(`open http://localhost:${port}`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error opening browser: ${error}`);
//             return;
//         }
//         console.log(stdout);
//     });
// };

// CALLING SERVER
// 


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // Use the provided port or 3000 as a default

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('interface'));
app.use(express.static('interface/img'));

// GETTING ROUTES
const userRoutes = require('./server/routes/index.js');
app.use('/', userRoutes);

// CALLING SERVER
app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});
