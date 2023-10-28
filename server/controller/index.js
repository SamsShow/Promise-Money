const path = require('path')

exports.getLandingPage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../interface/index.html" ));

  };