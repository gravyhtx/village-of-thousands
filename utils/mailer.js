const nodemailer = require('nodemailer');

exports.sendConfirmationEmail = function({ toUser, hash }) {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_GOOGLE,
                pass: process.env.EMAIL_GOOGLE_PW
            }
        })

        const message = {
            from: process.env.GOOGLE_USER,
            to: toUser.email,
            subject: 'Welcome to the Vilage! Confirm your Account',
            html: `
            <h3> Suh Duhhhd ${toUser.email}</h3>
            <p>Thank you for registering</p>

            <p>Click here to activate your account <a target="_blank" href="${process.env.URL}/api/users/activate/${hash}">Link </a></p>
            `
            // SWITCH TO "/activate?id=${hash}" AND CHECK IF USER MATCHES ID?
            // IF USER IS NOT LOGGED IN SEND ID TO LOGIN PAGE -- ONCED LOGGED IN CHECK WILL BE CONFIRMED (OR DENIED)
        }

        transporter.sendMail(message, function(err, info) {
            if (err) {
                rej(err)
            } else {
                res(info)
            }
        })
    })
}