import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../models/User";
import Order from "../../../../../models/Order";
import Claim from "../../../../../models/Claim";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'POST':
      try {
        const userVerification = await User.find({ _id: req.body.id});

        if(!userVerification || userVerification.length == 0) {
          return res.status(401).json({success: false, message: "This user is not a valid one"});
        }

        const claimExists = await Claim.find({simpleHash: req.body.simpleHash})
        if(claimExists.length == 0 || !claimExists) {
          return res.status(404).json({sucess: false, message: "This claim number does not exist"});
        }

        const newOrder = await Order.findOne({ simpleHash: req.body.simpleHash });

        if(!newOrder) {
          return res.status(404).json({success: false, message: "Could not find an Order to claim with this given Code"});
        }

        await User.findOneAndUpdate({_id: req.body.id}, {
          $push: {
            orders: newOrder
          }
        })

        await Claim.findOneAndDelete({simpleHash: req.body.simpleHash})

        res.status(200).json({ success: true, message: 'User has claimed an order'})
      }catch (err) {
        res.status(400).json({ success: false, message: 'There was an issue claiming your Order, please try again later' });
      }
      break;
  }
}