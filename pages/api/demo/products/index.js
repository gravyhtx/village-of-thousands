import dbConnect from "../../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import Demoproduct from '../../../../models/Demoproduct';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        const products = await Demoproduct.find({});
        
        res.status(200).json(products);
      } catch (err) {
        res.status(400).json({ success: false, message: 'Product finding error' });
      }
      break;
    case 'POST':
      try {
        // if(req.query.passphrase !== process.env.PRODUCT_PHRASE_DEMO) {
        //   return res.status(400).json({ success: false, message: "Nice Try Guy" })
        // }

        // if(!req.body.drop_id) {
        //   return res.status(400).json({ success: false, message: 'you must have a drop ID declared'})
        // }

        const newProduct = await Demoproduct.create(req.body);

        // await Drop.findOneAndUpdate({_id: req.body.drop_id}, {
        //   $push: {
        //     product_lineup: newProduct._id
        //   }
        // })

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