// OLD CODE IN '_playground' FOLDER IN COMPONENTS

import sgMail from '@sendgrid/mail';
import Link from 'next/link';

import VotEmail from '../templates/email/DefaultEmail';

export const sendConfirmationEmail = function({ toUser, hash }) {

  sgMail.setApiKey(process.env.SENDGRID);

  const link = "https://villageofthousands.com/activate/"+ hash

  const context = () => {
    return (
      `<div style="margin-bottom: 15px;">
        Welcome to the journey, fellow VoT Enthusiast! We look forward to growing with you.
      </div>
      <div>
        <a href="${link}" target="_blank" style="text-decoration: underline;">
          Click here to activate your account.
        </a>
      </div>`
    )
  }
    
  const msg = {
    to: toUser.email,
    from: 'andreslong92@gmail.com',
    subject: 'Welcome to the Village!',
    text: 'some text for testing',
    html: '<h1> yo </h1>',
    template_id: process.env.SENDGRID_TEMPLATE,
    dynamic_template_data: {
        link: link
    }
};
//   const msg = {
//     to: toUser.email,
//     from: 'andreslong92@gmail.com',
//     subject: 'Welcome to the Village!',
//     text: 'some text for testing',
//     html: '<h1> yo <h1/>'
// };
// html: VotEmail(context)

  return sgMail.send(msg);

}