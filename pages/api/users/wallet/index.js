import dbConnect from "../../../../utils/dbConnect";
import { authMiddleware } from "../../../../utils/jwAuth";
import User from '../../../../models/User';
import WalletAddress from '../../../../models/WalletAddress';
import WalletAddressGiveaway from '../../../../models/WalletAddressGiveaway';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    //Logic to delete wallets
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
    //Logic to add a new wallet
    case 'PUT':
      try {
        //Checks if the user is logged in
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, try logging in again' })
        }

        //checks if the wallet is already an active wallet on any account
        const walletExists = await WalletAddress.find({walletAddress: req.body.walletAddress})
        
        //if the wallet is an active wallet in any account, returns a 400 error
        if(walletExists.length !== 0) {
            return res.status(400).json({ success: false, message: 'A wallet with this specific Address already exists. Contact support if problem persists.'})
        }

        //creates a new wallet in the active wallet address
        const newWallet = await WalletAddress.create({
            userId: authorization._id,
            userEmail: authorization.email,
            ...req.body
        });

        //checks if the wallet has existed in the history of the site
        const giveawayExists = await WalletAddressGiveaway.find({walletAddress: req.body.walletAddress})

        //if it has not existed in the history of the site it adds it to the giveaway database
        if(giveawayExists.length === 0) {
          await WalletAddressGiveaway.create({
              walletAddress: newWallet.walletAddress,
              userId: authorization._id,
              userEmail: authorization.email,
              walletId: newWallet._id
          });
        }

        //assigns the new wallet to the user's wallet array to be used in relation to the user
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