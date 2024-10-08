import {MongoClient} from "mongodb";

const uri = ""
let client;

const connectDb = async () => {
  try {
    client = new MongoClient(uri);

    await client.connect();
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

export  {connectDb}