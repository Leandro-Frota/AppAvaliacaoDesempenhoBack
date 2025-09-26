const AuthRepository = {
  async login(db, email, password) {
    return await db.collection("users").findOne({ email });
  },
  async createUser(db, user) {
    await db.collection("users").insertOne(user);
  },
};

export default AuthRepository;
