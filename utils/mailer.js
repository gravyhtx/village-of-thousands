// OLD CODE IN '_playground' FOLDER IN COMPONENTS

import sgMail from '@sendgrid/mail';

// import VotEmail from '../templates/email/DefaultEmail';
// import { useRouter } from 'next/router';

export const sendConfirmationEmail = function({ toUser, hash }) {

  sgMail.setApiKey(process.env.SENDGRID);

  const link = "https://villageofthousands.com/activate/"+ hash;
    
  const msg = {
    to: toUser.email,
    from: 'villageofthousands@gmail.com',
    subject: 'Welcome to the Village!',
    text: 'Welcome to the Village!',
    html: '<h1> Village of Thousands </h1>',
    template_id: process.env.SENDGRID_TEMPLATE,
    dynamic_template_data: {
        link: link
      }
    };

  return sgMail.send(msg);

}