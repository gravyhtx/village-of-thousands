import dbConnect from "../../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import Drop from '../../../../models/Drop';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        const drops = await Drop.find({}).populate("product_lineup");
        
        res.status(200).json(drops);
      } catch (err) {
        res.status(400).json({ success: false, message: 'Drop finding error' });
      }
      break;
    
  }
}