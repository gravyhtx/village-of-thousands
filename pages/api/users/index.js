import dbConnect from "../../../utils/dbConnect";
import { signToken, authMiddleware } from "../../../utils/jwAuth";
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch ( method ) {
    // case 'GET':
    //   try {
    //     const user = await User.find({});
        
    //     res.status(200).json(user);
    //   } catch (err) {
    //     res.status(400).json({ success: false, message: 'User Creation Error' });
    //   }
    //   break;
    case 'POST':
      try {
        const user = await User.create(req.body);
        
        const token = signToken(user);
        res.status(201).json({ token, user });
      } catch (err) {
        res.status(400).json({ success: false, message: 'User Creation Error' });
      }
      break;
    case 'PUT':
      try {
        const authorization = await authMiddleware(req, res);
        
        if(!authorization) {
          return res.status(400).json({ success: false, message: 'Unauthorized Token' })
        }

        const updatedUser =  await User.findOneAndUpdate(
          {_id: authorization._id},
          req.body
        );

        res.status(200).json(updatedUser)
      }catch (err) {
        res.status(400).json({ success: false, message: 'User Update Error' });
      }
      break;
  }
}