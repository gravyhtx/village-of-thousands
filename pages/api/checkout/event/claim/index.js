import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../models/User";
import Order from "../../../../../models/Order";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'POST':
      try {
        const userVerification = await User.find({ _id: req.body.id});

        if(!userVerification) {
          return res.status(401).json({success: false, message: "This user is not a valid one"});
        }

        const newOrder = await Order({ simpleHash: req.body.simpleHash });

        if(!newOrder) {
          return res.status(401).json({success: false, message: "Could not find an Order to claim with this given Code"});
        }

        await User.findOneAndUpdate({_id: req.body.id}, {
          $push: {
            orders: newOrder
          }
        })

        res.status(200).json('User has claimed an order')
      }catch (err) {
        res.status(400).json({ success: false, message: 'There was an issue claiming your Order, please try again later' });
      }
      break;
  }
}