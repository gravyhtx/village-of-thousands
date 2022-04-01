import dbConnect from "../../../../utils/dbConnect";
import { authMiddleware } from "../../../../utils/jwAuth";
import User from '../../../../models/User';
import WalletAddress from '../../../../models/WalletAddress';
import WalletAddressGiveaway from '../../../../models/WalletAddressGiveaway';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'DELETE':
      try {
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, try logging in again' })
        }

        const walletExists = await WalletAddress.find({walletAddress: req.body.walletAddress})
        
        if(walletExists.length === 0) {
            return res.status(400).json({ success: false, message: 'No Wallet found with that Address'})
        }

        //this is the worst naming convention ever
        //removes wallet from User array of wallets
        const updatedUser =  await User.findOneAndUpdate(
          {_id: authorization._id},
          {
            $pull: { walletAddress: {walletAddress: req.body.walletAddress}}
          }
        );

        //removes wallet from active wallet database
        await WalletAddress.findOneAndDelete({walletAddress: req.body.walletAddress})
        
        res.status(200).json(updatedUser)
      }catch (err) {
        res.status(400).json({ success: false, message: 'Issue Deleting a wallet' });
      }
      break;
    case 'PUT':
      try {
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, try logging in again' })
        }

        const walletExists = await WalletAddress.find({walletAddress: req.body.walletAddress})
        
        if(walletExists.length !== 0) {
            return res.status(400).json({ success: false, message: 'A wallet with this specific Address already exists. Contact support if problem persists.'})
        }

        const newWallet = await WalletAddress.create({
            userId: authorization._id,
            userEmail: authorization.email,
            ...req.body
        });

        const giveawayExists = await WalletAddressGiveaway.find({walletAddress: req.body.walletAddress})

        if(giveawayExists.length === 0) {
          await WalletAddressGiveaway.create({
              walletAddress: newWallet.walletAddress,
              userId: authorization._id,
              userEmail: authorization.email,
              walletId: newWallet._id
          });
        }

        const updatedUser =  await User.findOneAndUpdate(
          {_id: authorization._id},
          {
            $push: { walletAddress: newWallet}
          }
        );

        res.status(200).json(updatedUser)
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Update Error while getting Wallet' });
      }
      break;
  }
}