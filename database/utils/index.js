const sgMail = require('@sendgrid/mail');
const keys = require('../../configs/keys');

sgMail.setApiKey(keys.SENDGRID_API_KEY);

// This function will be used to send emails using sendgrid package, accepts an object containing the from, to, subject and text or html info, the object is passed to sendgrid send function to send the the email. If successful, the result is returned. 
function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

module.exports = { sendEmail };