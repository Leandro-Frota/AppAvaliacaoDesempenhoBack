import {MongoClient} from "mongodb";

const uri = "mongodb+srv://leandromfrota:b4TXVJBnqcAjbzMF@employee.alwyy.mongodb.net/?retryWrites=true&w=majority&appName=employee"
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

const getDB = () => {
    if (!client) {
      throw new Error('You must connect first!');
    }
    return client.db('avaliacaoDessempenhoDB');
  };
  
  export { connectDb, getDB };

