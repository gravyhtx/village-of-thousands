import dbConnect from "../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import Product from '../../../models/Product';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    //get me all products
    case 'GET':
      try {
        const products = await Product.find({'product_information._id': '628d4da5e088ca506885683f'});
        
        res.status(200).json(products);
      } catch (err) {
        res.status(400).json({ success: false, message: 'Product finding error' });
      }
      break;
  }
}