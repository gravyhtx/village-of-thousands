import mongoose, { connect } from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.MONGODB_URI)

  connection.isConnected = db.connections[0].readyState;
  // console.log(connection)
}

export default dbConnect;