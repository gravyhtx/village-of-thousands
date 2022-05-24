import dbConnect from "../../../../utils/dbConnect";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY_TEST)
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    case 'PUT':
      try {
        await stripe.paymentIntents.update(
          'pi_3KwClCCa1OD2RYql0le8Pfsz',
          { amount: 500 }
        )
        res.status(200).json('updatedUser')
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Update Error' });
      }
      break;
  }
}