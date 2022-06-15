import dbConnect from "../../../../utils/dbConnect";
import Category from '../../../../models/Category';
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

        if(!req.body.drop_id) {
          return res.status(400).json({ success: false, message: 'you must have a Drop ID declared'})
        }

        const newCategory = await Category.create(req.body);

        await Drop.findOneAndUpdate({_id: req.body.drop_id}, {
          $push: {
            product_lineup: newCategory._id
          }
        })

        res.status(201).json({ newCategory, message: 'New Category added Successfully' });
      } catch (err) {
        res.status(400).json({ success: false, message: 'Category Creation Error' });
      }
      break;
  }
}