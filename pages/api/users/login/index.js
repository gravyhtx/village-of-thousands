import dbConnect from "../../../../utils/dbConnect";
import { signToken } from "../../../../utils/jwAuth";
import User from '../../../../models/User';
import PendingUser from '../../../../models/PendingUser';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
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