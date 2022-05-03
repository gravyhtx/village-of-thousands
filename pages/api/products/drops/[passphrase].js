import dbConnect from "../../../../utils/dbConnect";
// import { signToken, authMiddleware } from "../../../utils/jwAuth";
import Drop from '../../../../models/Drop';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        if (req.query.passphrase !== process.env.PRODUCT_PHRASE) {
          return res.status(400).json({ success: false, message: "Nice Try Guy" })
        }
        const newDrop = await Drop.create(req.body);

        res.status(201).json({ newDrop, message: 'New Drop added Successfully' });
      } catch (err) {
        res.status(400).json({ success: false, message: 'Drop Creation Error' });
      }
      break;
  }
}