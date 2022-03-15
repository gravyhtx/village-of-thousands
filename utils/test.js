const sgMail = require('@sendgrid/mail');

const sendConfirmationEmail = function({ toUser, hash }) {

    sgMail.setApiKey("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");

    const msg = {
        to: "godisgravy@gmail.com",
        from: "villageofthousands@gmail.com",
        subject: 'Welcome to the Village!',
        text: 'some text for testing',
        html: '<h1> Village </h1>'
    }

    return sgMail.send(msg)
}

sendConfirmationEmail({
    toUser: 'test',
    hash: 'hash'
})