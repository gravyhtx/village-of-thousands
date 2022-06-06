import dbConnect from "../../../../utils/dbConnect";
import Category from '../../../../models/Category';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        const categories = await Category.find({}).populate("products");
        console.log(categories)
        // console.log(categories)
        res.status(200).json(categories);
      } catch (err) {
        res.status(400).json({ success: false, message: 'Category finding error' });
      }
      break;
    
  }
}