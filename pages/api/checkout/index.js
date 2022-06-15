import dbConnect from "../../../utils/dbConnect";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
import { authMiddleware } from '../../../utils/jwAuth';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'PUT':
      try {
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, Must Log In!' })
        }

        if(req.body.amount < 1) {
          return res.status(400).json({ success: false, message: 'Total Amount is too little.'})
        }

        // console.log(req.body.amount *100)
        
        const stripeResponse = await stripe.paymentIntents.update(
          req.body.stripeId,
          { amount: Math.floor(req.body.amount * 100) }
        )
        // console.log(stripeResponse)
        res.status(200).json(stripeResponse)
      }catch (err) {
        res.status(400).json({ success: false, message: 'Payment Total Update Error', error: err });
      }
      break;
  }
}