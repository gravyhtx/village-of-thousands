import dbConnect from "../../../../utils/dbConnect";
import { authMiddleware } from "../../../../utils/jwAuth";
import User from '../../../../models/User';
import WalletAddress from '../../../../models/WalletAddress';
import WalletAddressGiveaway from '../../../../models/WalletAddressGiveaway';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'POST':
      try {
        const pUser = await PendingUser.findOne({email: req.body.email});
        const pUserCheck = await User.findOne({email: req.body.email});

        if(pUser || pUserCheck) {
          return res.status(422).json({ success: false, message: "User email already exists"})
        }

        const user = await PendingUser.create(req.body);
        
        const confirmation = await sendConfirmationEmail({toUser: user, hash: user._id.toString()})
        console.log(confirmation)
        const token = signToken(user);
        res.status(201).json({ token, user, message: 'You have been registered! Please check your email for verification' });
      } catch (err) {
        res.status(400).json({ success: false, message: 'User Creation Error', error: err });
      }
      break;
    case 'PUT':
      try {
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token' })
        }
        
        const newWallet = await WalletAddress.create({
            userId: authorization._id,
            userEmail: authorization.email,
            ...req.body
        });

        await WalletAddressGiveaway.create({
            walletAddress: newWallet.walletAddress,
            userId: authorization._id,
            userEmail: authorization.email,
            walletId: newWallet._id
        });

        const updatedUser =  await User.findOneAndUpdate(
          {_id: authorization._id},
          {
            $push: { walletAddress: newWallet}
          }
        );

        res.status(200).json(updatedUser)
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Update Error' });
      }
      break;
  }
}