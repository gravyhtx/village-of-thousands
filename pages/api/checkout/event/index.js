import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import Order from "../../../../models/Order";
import Claim from "../../../../models/Claim";
import EventActive from "../../../../models/EventActive";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // const authorization = await authMiddleware(req, res);

        // if (!authorization) {
        //   return res.status(400).json({ success: false, message: 'Unauthorized Token, Must Log In!' })
        // }

        const currentStatus = await EventActive.find({})
        
        res.status(200).json({ success: true, message: 'Changed the Event status', eventStatus: currentStatus[0].isActive})
      } catch (err) {
        res.status(400).json({ success: false, message: 'Event Status Change Error', error: err });
      }
      break;
    case 'POST':
      try {
        const userVerification = await User.find({ _id: req.body.id });

        if (!userVerification) {
          return res.status(401).json({ success: false, message: "This user is not a valid one" });
        }

        //userEmail in this case is filler for future version implementations
        // userEmail: req.body.paymentType === "Stripe" ? req.body.userEmail : "",
        const orderObj = {
          products: req.body.products,
          productSKU: req.body.productSKU,
          paymentType: req.body.paymentType,
          deliveryStatus: req.body.deliveryStatus,
          totalPrice: req.body.totalPrice,
          simpleHash: req.body.simpleHash,
          isPhysicalSale: req.body.isPhysicalSale
        }

        await Order.create(orderObj);

        const claimObj = {
          simpleHash: req.body.simpleHash
        }

        await Claim.create(claimObj);

        res.status(200).json('Added new order to DB')
      } catch (err) {
        res.status(400).json({ success: false, message: 'New Order Error' });
      }
      break;
    case 'PUT':
      try {
        const authorization = await authMiddleware(req, res);

        if (!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, Must Log In!' })
        }

        const currentStatus = await EventActive.find({})

        await EventActive.findByIdAndUpdate(
          {_id: "636c1d0681743de4c5b25429"},
          {isActive: !currentStatus[0].isActive})
        
        res.status(200).json({ success: true, message: 'Changed the Event status', response: currentStatus})
      } catch (err) {
        res.status(400).json({ success: false, message: 'Event Status Change Error', error: err });
      }
      break;
  }
}