import { getDB } from "../config/db.js";
import AuthRepository from "../reposytories/authRepository.js";
import bcrypt from "bcrypt";

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const db = await getDB();

      const user = await AuthRepository.login(db, email);
      console.log(user);
      if (!user) {
        return res.status(400).send("Invalid data");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send("Invalid credentials");
      }

      res
        .status(200)
        .json({
          message: "Login successful",
          user: { id: user._id, email: user.email },
        });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Server error" });
    }
  },

  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const db = await getDB();
      const existingUser = await AuthRepository.login(db, email);
      if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await AuthRepository.createUser(db, { email, password: hashedPassword });

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
};

export default AuthController;
