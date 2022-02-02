const nodemailer = require('nodemailer');

// Only ONE person should be emailed at a time unless intentionally sending to a group. USE A LOOP to send emails to multiple people
const Nodemailer = ( user, to, subject, text, html ) => {
    // Set reusable values
    const emailAccount = process.env.REACT_APP_COMPANY_NAME;
    const emailFrom = user?user.toLowerCase():"info";
    const emailUser = emailFrom.toUpperCase();
    const emailPass = (emailFrom === "orders") ? process.env.REACT_APP_EMAIL_INFO_PASSWORD : process.env.REACT_APP_EMAIL_INFO_PASSWORD;
    const emailTo = to.toLowerCase();
    const emailSubject = subject?subject:emailAccount;
    const emailText = text?text:"";
    const emailHtml = html?text:"";
    // Create the transporter with the required configuration for Outlook (GoDaddy emails)
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
        ciphers:'SSLv3'
        },
        auth: {
            user: `${emailUser}@${process.env.REACT_APP_DOMAIN}`,
            pass: `${emailPass}`
        }
    });

    // setup e-mail data, even with unicode symbols
    var mailOptions = {
        from: `"${emailAccount} // ${emailUser} " <${emailFrom}@${process.env.REACT_APP_DOMAIN}>`, // sender address (who sends)
        to: emailTo, // list of receivers (who receives)
        subject: emailSubject, // Subject line
        text: emailText, // plaintext body
        html: emailHtml // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.error(error);
        }
        console.log('Message sent: ' + info.response);
    });
}


export default Nodemailer;