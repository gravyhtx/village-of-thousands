import dbConnect from "../../../../utils/dbConnect";
import { authMiddleware } from "../../../../utils/jwAuth";
import PendingUser from '../../../../models/PendingUser';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    //updates pending user information, used to give the pending user a seedhex
    case 'PUT':
      try {
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token' })
        }

        const updatedUser =  await PendingUser.findOneAndUpdate(
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