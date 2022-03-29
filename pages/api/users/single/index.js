import dbConnect from "../../../../utils/dbConnect";
import { authMiddleware } from "../../../../utils/jwAuth";
import User from '../../../../models/User';
import PendingUser from '../../../../models/PendingUser';

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

        const user = await User.findOne({
          $or: [{ _id: authorization._id }, { email: authorization.email }],
        });

        const pUser = await PendingUser.findOne({
          $or: [{ _id: authorization._id }, { email: authorization.email }],
        });

        if (!user && !pUser) {
          return res.status(400).json({ message: 'Cannot find this user' })
        }
        let foundUser = {};
        let pending = false

        if(pUser) {
          foundUser = pUser;
          pending = true;
        }else {
          foundUser = user;
        }

        res.status(200).json({foundUser, pending})
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Tracking Error' });
      }
      break;      
  }
}