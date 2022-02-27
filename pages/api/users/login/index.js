import dbConnect from "../../../../utils/dbConnect";
import { signToken } from "../../../../utils/jwAuth";
import User from '../../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'POST':
      try {
        const user = await User.findOne({ $or: [{ email: req.body.email }] });

        if (!user) {
          return res.status(400).json({ message: 'Cannot find this user'})
        }

        const correctPw =  await user.isCorrectPassword(req.body.password);

        if(!correctPw) {
          return res.status(400).json({ message: 'Wrong password!' })
        }

        const token = signToken(user);
        res.status(200).json({ token, user });
      } catch (err) {
        res.status(400).json({ success: false, message: 'User Creation Error' });
      }
      break;
  }
}