import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database conected");
  } catch (error) {
    console.log(error);
  }
};

export default DbConnect;
