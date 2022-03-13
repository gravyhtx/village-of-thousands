import dbConnect from "../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import Product from "../../../models/Product";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        const product = await Product.findOne({product_path: req.query.productPath});
        
        res.status(200).json(product);
      } catch (err) {
        res.status(400).json({ success: false, message: 'User Creation Error' });
      }
      break;
  }
}