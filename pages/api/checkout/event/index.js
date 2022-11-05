import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import PendingOrder from "../../../../models/PendingOrder";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'POST':
      try {
        const userVerification = await User.find({ _id: req.body.id});

        if(!userVerification) {
          return res.status(401).json({success: false, message: "This user is not a valid one"});
        }

        //userEmail in this case is filler for future version implementations
        const orderObj = {
            userEmail: req.body.paymentType === "Stripe" ? req.body.userEmail : "",
            products: req.body.products,
            productSKU: req.body.productSKU,
            totalPrice: req.body.totalPrice,
            paymentType: req.body.paymentType,
            simpleHash: req.body.simpleHash,
            isPhysicalSale: req.body.isPhysicalSale
        }

        await PendingOrder.create(orderObj);

        res.status(200).json('Added new order to DB')
      }catch (err) {
        res.status(400).json({ success: false, message: 'New Order Error' });
      }
      break;
  }
}