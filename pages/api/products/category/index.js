import dbConnect from "../../../../utils/dbConnect";
import models from '../../../../models';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'GET':
      try {
<<<<<<< HEAD
        const categories = await Category.find({}).populate("products");
        console.log(categories)
        // console.log(categories)
        res.status(200).json(categories);
=======
        // const categoryLoad = await Category.find({});
        // console.log(categoryLoad)
        models.Category.find({}).populate('products').exec(function(err, prod) {
          if (err) console.error(err);
          console.log(prod)
          res.status(200).json(prod);
        });
        
>>>>>>> 53bcc6c2bf0d45ac0f60ea64395b7bcdee03a922
      } catch (err) {
        res.status(400).json({ success: false, message: 'Category finding error' });
      }
      break;
    
  }
}