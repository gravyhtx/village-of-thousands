import dbConnect from "../../utils/dbConnect";
// import { authMiddleware } from "../../../../utils/jwAuth";
import User from '../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        const foundUser =  await User.findOne({email: req.query.emailKey});

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