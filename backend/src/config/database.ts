import mongoose from "mongoose";
import constants from "../constants/messages";

const connectDatabase = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(constants.ERROR_MESSAGES.DATABASE.MONGODB_URI_NOT_DEFINED);
  }

  try {
    const connection = await mongoose.connect(uri);
    console.log(
      `${constants.SUCCESS.DATABASE.CONNECTION_SUCCESS}: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(constants.ERROR_MESSAGES.DATABASE.CONNECTION_ERROR, error);
    process.exit(1);
  }
};

export { connectDatabase };
