import dbConnect from "../../../../utils/dbConnect";
import { authMiddleware } from "../../../../utils/jwAuth";
import User from '../../../../models/User';
import WalletAddress from '../../../../models/WalletAddress';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    //Updates the wallet array to have the 'main' wallet be at position 0 in the array,
    //this will be the default wallet that gets charged in the future.
    case 'PUT':
      try {
        //Makes sure that the account is logged in and valid
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, try logging in again' })
        }

        const wallet = await WalletAddress.find({walletAddress: req.body.walletAddress})

        //Pulls the wallet off the index in which is exists
        await User.findOneAndUpdate(
          {_id: authorization._id},
          {
            $pull: { walletAddress: { walletAddress: req.body.walletAddress}}
          }
        );

        //Pushes the wallet back into the first index of the array
        const updatedUser = await User.findOneAndUpdate(
          {_id: authorization._id},
          {
            $push: {
              walletAddress: {
                $each: wallet,
                $position: 0
              }
            },
          }
          );

        res.status(200).json(updatedUser)
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Update Error while getting Wallet' });
      }
      break;
  }
}