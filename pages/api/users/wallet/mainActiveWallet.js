import dbConnect from "../../../../utils/dbConnect";
import { authMiddleware } from "../../../../utils/jwAuth";
import User from '../../../../models/User';
import WalletAddress from '../../../../models/WalletAddress';
import WalletAddressGiveaway from '../../../../models/WalletAddressGiveaway';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'PUT':
      try {
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, try logging in again' })
        }

        const wallet = await WalletAddress.find({walletAddress: req.body.walletAddress})

        await User.findOneAndUpdate(
          {_id: authorization._id},
          {
            $pull: { walletAddress: { walletAddress: req.body.walletAddress}}
          }
        );

        console.log(wallet)
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
          console.log(wallet)

        res.status(200).json(updatedUser)
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Update Error while getting Wallet' });
      }
      break;
  }
}