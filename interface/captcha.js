const axios = require('axios');
const secretKey = '6LfyMNcoAAAAABmK8zCKLPkbyyKJrifDBRml_PYl';
const recaptchaResponse = req.body['g-recaptcha-response'];

axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
    params: {
        secret: secretKey,
        response: recaptchaResponse
    }
})
.then(response => {
    if (response.data.success) {
        // reCAPTCHA was successful, continue with user registration.
    } else {
        // reCAPTCHA failed, handle accordingly.
    }
})
.catch(error => {
    // Handle the error.
});
