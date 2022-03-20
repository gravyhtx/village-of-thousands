// OLD CODE IN '_playground' FOLDER IN COMPONENTS

import sgMail from '@sendgrid/mail';
import Link from 'next/link';
// import { useRouter } from 'next/router';

export const sendConfirmationEmail = function({ toUser, hash }) {
  // console.log('stuff')
  sgMail.setApiKey(process.env.SENDGRID);
  // console.log(process.env.SENDGRID)
  const HashLink = ({ text }) => {
    return (
      <Link href={`/activate/${hash}`}>{text}</Link>
    )
  };
  const body = () => {
      return (
				<></>
      )
  }
  const msg = {
    to: toUser.email,
    from: "andreslong92@gmail.com",
    subject: 'Welcome to the Village!',
    test: 'some text for testing',
    html: `<h1> Village ${hash} </h1>`
  }

  return sgMail.send(msg)
}

