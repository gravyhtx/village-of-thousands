import dbConnect from "../../../utils/dbConnect";
import models from '../../../models';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    //get me all orders
    case 'GET':
      try {
        models.Order.find({}).populate('products').exec(function(err, orderHistory) {
          if (err) console.error(err);
          console.log(orderHistory)
          const totalGrossEarnings = orderHistory.reduce((x, y) => x + y.totalPrice, 0)
          res.status(200).json({orderHistory, totalGrossEarnings});
        });  
      } catch (err) {
        res.status(400).json({ success: false, message: 'Product finding error' });
      }
      break;
  }
}