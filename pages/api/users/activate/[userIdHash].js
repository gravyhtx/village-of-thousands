import dbConnect from "../../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import User from '../../../../models/User';
import SessionInformation from '../../../../models/SessionInformation';
import PendingUser from '../../../../models/PendingUser';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    //finds the pending user, creates a new session recorder, updates the seesion recorder with the current login date
    //creates an active user with all the info from the pending user, deletes the pending user
    case 'GET':
      try {
        const pUser = await PendingUser.findOne({_id: req.query.userIdHash});

        const newSessionInfo = await SessionInformation.create({})
        await SessionInformation.findOneAndUpdate({_id: newSessionInfo._id}, 
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