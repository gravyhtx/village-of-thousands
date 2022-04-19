import dbConnect from "../../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import Product from '../../../../models/Product';
import Drop from '../../../../models/Drop';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'POST':
      try {
        if(req.query.passphrase !== process.env.PRODUCT_PHRASE) {
          return res.status(400).json({ success: false, message: "Nice Try Guy" })
        }

        if(!req.body.drop_id) {
          return res.status(400).json({ success: false, message: 'you must have a drop ID declared'})
        }

        const newProduct = await Product.create(req.body);

        await Drop.findOneAndUpdate({_id: req.body.drop_id}, {
          $push: {
            product_lineup: newProduct._id
          }
        })

        res.status(201).json({ newProduct, message: 'New Product added Successfully' });
      } catch (err) {
        res.status(400).json({ success: false, message: 'Product Creation Error' });
      }
      break;
    case 'PUT':
      try {
        res.status(200).json('updatedUser')
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Update Error' });
      }
      break;
  }
}