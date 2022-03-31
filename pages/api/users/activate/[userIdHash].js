import dbConnect from "../../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import User from '../../../../models/User';
import SessionInformation from '../../../../models/SessionInformation';
import PendingUser from '../../../../models/PendingUser';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        const pUser = await PendingUser.findOne({_id: req.query.userIdHash});

        const newSessionInfo = await SessionInformation.create({})
        const updateSession = await SessionInformation.findOneAndUpdate({_id: newSessionInfo._id}, 
          {
            $push: { loggedInDates: Date.now()}
          }
        );
        const user = await User.create({
            email: pUser.email,
            password: pUser.password,
            seedHex: pUser.seedHex,
            sessionInformation: newSessionInfo._id
        })

        await PendingUser.findOneAndDelete({_id: req.query.userIdHash});
        
        res.status(200).json(user);
      } catch (err) {
        res.status(400).json({ success: false, message: 'Activation Creation Error' , error: err});
      }
      break;
  }
}