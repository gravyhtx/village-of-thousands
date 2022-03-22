import dbConnect from "../../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import User from '../../../../models/User';
import PendingUser from '../../../../models/PendingUser';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        const pUser = await PendingUser.findOne({_id: req.query.userIdHash});

        const user = await User.create({
            email: pUser.email,
            password: pUser.password
        })

        await PendingUser.findOneAndDelete({_id: req.query.userIdHash});
        
        res.status(200).json(user);
      } catch (err) {
        res.status(400).json({ success: false, message: 'Activation Creation Error' });
      }
      break;
  }
}