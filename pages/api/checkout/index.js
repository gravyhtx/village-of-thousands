import dbConnect from "../../../utils/dbConnect";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
import OngoingPayment from "../../../models/OngoingPayment";
import { authMiddleware } from '../../../utils/jwAuth';
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const authorization = await authMiddleware(req, res);

        if (!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, Must Log In!' })
        }

        let paymentIntent;

        const paymentExist = await OngoingPayment.find({ userId: req.body.userId })

        if (!paymentExist.length == 0) {
          paymentIntent = await stripe.paymentIntents.retrieve(paymentExist[0].paymentId)

          return res.status(200).json({ success: true, message: "Loaded Payment Intent from stripe history", paymentId: paymentIntent.id, paymentIntent })
        }

        if (req.body.amount < 1) {
          return res.status(400).json({ success: false, message: 'Total Amount is too little.' })
        }

        paymentIntent = await stripe.paymentIntents.create({
          amount: Math.floor(req.body.amount * 100),
          currency: 'usd'
        })

        const paymentObj = {
          userId: req.body.userId,
          userEmail: req.body.userEmail,
          paymentId: paymentIntent.id
        }

        await OngoingPayment.create(paymentObj);

        return res.status(200).json({ success: true, message: "Loaded Payment Intent from stripe history", paymentId: paymentIntent.id, paymentIntent })

      } catch (err) {
        res.status(400).json({ success: false, message: 'Payment posting Error', error: err })
      }
      break;
    case 'PUT':
      try {
        const authorization = await authMiddleware(req, res);

        if (!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, Must Log In!' })
        }

        if (req.body.amount < 1) {
          return res.status(400).json({ success: false, message: 'Total Amount is too little.' })
        }

        const stripeResponse = await stripe.paymentIntents.update(
          req.body.stripeId,
          { amount: Math.floor(req.body.amount * 100) }
        )

        res.status(200).json(stripeResponse)
      } catch (err) {
        res.status(400).json({ success: false, message: 'Payment Total Update Error', error: err });
      }
      break;
    case 'DELETE':
      try {
        const authorization = await authMiddleware(req, res);

        if (!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token, Must Log In!' })
        }

        await OngoingPayment.findOneAndDelete({userId: req.body.userId})

        res.status(200).json({ success: true, message: 'Deleted Payment Storage for User succesfully'})

      } catch (err) {
        res.status(400).json({ success: false, message: 'Payment DELETE Error' })
      }
      break;
  }
}