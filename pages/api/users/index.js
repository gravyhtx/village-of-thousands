import dbConnect from "../../../utils/dbConnect";
import { signToken, authMiddleware } from "../../../utils/jwAuth";
import User from '../../../models/User';
import PendingUser from '../../../models/PendingUser';
import { sendConfirmationEmail } from '../../../utils/mailer'
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    //Example of a get request for referencial purposes

    // case 'GET':
    //   try {
    //     const user = await User.find({});
        
    //     res.status(200).json(user);
    //   } catch (err) {
    //     res.status(400).json({ success: false, message: 'User Creation Error' });
    //   }
    //   break;
    case 'POST':
      try {
        const pUser = await PendingUser.findOne({email: req.body.email});
        const pUserCheck = await User.findOne({email: req.body.email});

        if(pUser || pUserCheck) {
          return res.status(422).json({ success: false, message: "User email already exists"})
        }

        const user = await PendingUser.create(req.body);
        
        const confirmation = await sendConfirmationEmail({toUser: user, hash: user._id.toString()})
        console.log(confirmation)
        const token = signToken(user);
        res.status(201).json({ token, user, message: 'You have been registered! Please check your email for verification' });
      } catch (err) {
        res.status(400).json({ success: false, message: 'User Creation Error', error: err });
      }
      break;
    case 'PUT':
      try {
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token' })
        }

        const updatedUser =  await User.findOneAndUpdate(
          {_id: authorization._id},
          req.body
        );

        res.status(200).json(updatedUser)
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Update Error' });
      }
      break;
  }
}