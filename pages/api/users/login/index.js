import dbConnect from "../../../../utils/dbConnect";
import { signToken } from "../../../../utils/jwAuth";
import User from '../../../../models/User';
import SessionInformation from '../../../../models/SessionInformation';
import PendingUser from '../../../../models/PendingUser';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    //Logs you into the app regardless if you're a pending user or an active user
    case 'POST':
      try {
        const user = await User.findOne({ $or: [{ email: req.body.email }] });
        const pUser = await PendingUser.findOne({ $or: [{ email: req.body.email }] });

        if (!user && !pUser) {
          return res.status(400).json({ message: 'Cannot find this user' })
        }
        let correctPw = false;

        if (pUser) {
          correctPw = await pUser.isCorrectPassword(req.body.password);
        }else {
          correctPw = await user.isCorrectPassword(req.body.password);
        }

        if (!correctPw) {
          return res.status(400).json({ message: 'Wrong password!' })
        }

        let token = {};

        if (user) {
          //makes sure to update the session information with the date in which they logged in
          await SessionInformation.findOneAndUpdate({_id: user.sessionInformation.toString()}, 
          {
            $push: { loggedInDates: Date.now()}
          }
          )
          token = signToken(user);
        }else {
          token = signToken(pUser);
        }

        res.status(200).json({ token, user });
      } catch (err) {
        res.status(400).json({ success: false, message: 'User Login Error' });
      }
      break;
  }
}