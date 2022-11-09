import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import Order from "../../../../models/Order";

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

        const billingAddress = {
          ...req.body.billingAddress
        }

        let shippingAddress;

        if(req.body.addressCheck == true) {
          shippingAddress = billingAddress
        }else {
          shippingAddress = {
            ...req.body.shippingAddress
          }
        }

        //object adjusted for both physical and online stripe formats
        const orderObj = {
            userEmail: req.body.userEmail,
            products: req.body.products,
            productSKU: req.body.productSKU,
            paymentConfirmation: req.body.paymentConfirmation,
            totalPrice: req.body.totalPrice,
            specialInstructions: req.body.specialInstructions,
            shippingAddress: !req.body.isPhysicalSale ? shippingAddress : "",
            billingAddress: !req.body.isPhysicalSale ? shippingAddress : "",
            paymentType: req.body.paymentType,
            simpleHash: req.body.simpleHash,
            isPhysicalSale: req.body.isPhysicalSale
        }

        const newOrder = await Order.create(orderObj);

        await User.findOneAndUpdate({_id: req.body.id}, {
          $push: {
            orders: newOrder
          }
        })

        res.status(200).json('Added new order to DB')
      }catch (err) {
        res.status(400).json({ success: false, message: 'New Order Error' });
      }
      break;
  }
}