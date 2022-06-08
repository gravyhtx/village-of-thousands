import dbConnect from "../../../../utils/dbConnect";
import models from '../../../../models';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
        // const categoryLoad = await Category.find({});
        // console.log(categoryLoad)
        models.Category.find({}).populate('products').exec(function(err, prod) {
          if (err) console.error(err);
          console.log(prod)
          res.status(200).json(prod);
        });
        
      } catch (err) {
        res.status(400).json({ success: false, message: 'Category finding error' });
      }
      break;
    
  }
}