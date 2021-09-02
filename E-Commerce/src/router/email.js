// const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

// sgMail.setApiKey(process.env.VUE_APP_SENDGRID_API_KEY);
function sendwelcomeemail(name) {
    // const msg = {
    //     to: 'dipakpatil2415@gmail.com',
    //     from: 'test@example.com',
    //     subject: 'Sending with Twilio SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // };
    // sgMail.send(msg);
    var options = {
        auth: {
            api_key: process.env.VUE_APP_SENDGRID_API_KEY
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));
    var msg = {
        to: name,
        from: 'dipakpatil2615@gmail.com',
        subject: 'Hi there',
        text: 'Awesome sauce',
        html: '<b>Awesome sauce</b>'
    };
    mailer.sendMail(msg, function(err, res) {
        if (err) { 
            console.log(err) 
        }
        console.log(res);
    });

// var templateParams = {
//     name: 'Dipak',
//     notes: 'Welcome To Unbox-11!',
//     email:name,
// };
// emailjs.send('gmail', 'welcome', templateParams, process.env.VUE_APP_API_KEY)
//     .then((result) => {
//         console.log('SUCCESS!');
//     }, (error) => {
//         console.log('FAILED...');
//     });
}
export default sendwelcomeemail