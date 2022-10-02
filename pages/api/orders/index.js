import dbConnect from "../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import Order from '../../../models/Order';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    //get me all products
    case 'GET':
      try {
        const orderHistory = await Order.find({});
        const totalGrossEarnings = orderHistory.reduce((x, y) => x + y.totalPrice, 0)
        
        res.status(200).json({orderHistory, totalGrossEarnings});
      } catch (err) {
        res.status(400).json({ success: false, message: 'Product finding error' });
      }
      break;
  }
}