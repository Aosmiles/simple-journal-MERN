import mongoose from "mongoose";

const connectDB = async () => {
  const connectonOptions = {
    dbname: process.env.MONGO_DBNAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, connectonOptions);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
