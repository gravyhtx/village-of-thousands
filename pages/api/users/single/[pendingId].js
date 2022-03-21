import dbConnect from "../../../../utils/dbConnect";
// import { authMiddleware } from "../../../../utils/jwAuth";
import PendingUser from '../../../../models/PendingUser';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        const foundUser =  await PendingUser.findOne({_id: req.query.pendingId});

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