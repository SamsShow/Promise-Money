const path = require('path')

exports.getLandingPage = (req, res) => {
    const landingPathPath = path.join(__dirname, "../../interface/index.html" );
    res.status(200).sendFile(landingPathPath);

  };