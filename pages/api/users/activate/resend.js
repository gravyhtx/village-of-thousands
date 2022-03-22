import { sendConfirmationEmail } from "../../../../utils/mailer";

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'POST':
      try {
        const confirmation = await sendConfirmationEmail({ toUser: req.body, hash: req.body._id.toString() });

        res.status(200).json({ success: true, message: 'Resent confirmation code!' });
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Tracking Error' });
      }
      break;      
  }
}