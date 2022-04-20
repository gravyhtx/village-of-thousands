import dbConnect from "../../../utils/dbConnect";
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {

    // Finds user by email, possible use case: password recovery when comparing seedHex

    case 'GET':
      try {
        const foundUser =  await User.findOne({email: req.query.emailKey}, "id email seedHex");

        if (!foundUser) {
          return res.status(400).json({ message: 'Cannot find a user with this email!' });
        }

        res.status(200).json(foundUser)
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Tracking Error' });
      }
      break;      
  }
}