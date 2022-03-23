// OLD CODE IN '_playground' FOLDER IN COMPONENTS

import sgMail from '@sendgrid/mail';
import Link from 'next/link';

import VotEmail from '../templates/email/DefaultEmail';
// import { useRouter } from 'next/router';

export const sendConfirmationEmail = function({ toUser, hash }) {

  sgMail.setApiKey(process.env.SENDGRID);

<<<<<<< HEAD
  const link = "https://villageofthousands.com/activate/"+hash;

  const context = 
    `<div style="margin-bottom: 15px;">
      Welcome to the journey, fellow VoT Enthusiast! We look forward to growing with you.
    </div>
    <div>
      <a href="${link}" target="_blank" style="text-decoration: underline;">
        Click here to activate your account.
      </a>
    </div>`;
      
=======
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
    
>>>>>>> be71e62c98a6f18cb6c26265d9ff216c9e8e31dd
  const msg = {
    to: toUser.email,
    from: 'andreslong92@gmail.com',
    subject: 'Welcome to the Village!',
    test: 'some text for testing',
<<<<<<< HEAD
    html: VotEmail(context)
  };
=======
    html: '<h1> Hello <h1/>'
  }
  // html: <VotEmail content={context} />
>>>>>>> be71e62c98a6f18cb6c26265d9ff216c9e8e31dd

  return sgMail.send(msg);

}