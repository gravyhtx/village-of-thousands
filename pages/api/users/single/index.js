import dbConnect from "../../../../utils/dbConnect";
import { authMiddleware } from "../../../../utils/jwAuth";
import User from '../../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token' })
        }

        const foundUser =  await User.findOne({
          $or: [{ _id: authorization._id }, { email: authorization.email }],
        });

        if (!foundUser) {
          return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }

        res.status(200).json(foundUser)
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Tracking Error' });
      }
      break;      
  }
}