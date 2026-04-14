import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Default users (fixed)
const users = [
  { id: 1, name: "Kaif", age: 22, email: "kaif@gmail.com", password: "123456" },
  { id: 2, name: "Ali", age: 23, email: "ali@gmail.com", password: "123456" },
  { id: 3, name: "Rahul", age: 21, email: "rahul@gmail.com", password: "123456" },
  { id: 4, name: "Aman", age: 24, email: "aman@gmail.com", password: "123456" },
  { id: 5, name: "Zaid", age: 22, email: "zaid@gmail.com", password: "123456" },
  { id: 6, name: "Rohit", age: 25, email: "rohit@gmail.com", password: "123456" },
  { id: 7, name: "Imran", age: 23, email: "imran@gmail.com", password: "123456" },
  { id: 8, name: "Arjun", age: 22, email: "arjun@gmail.com", password: "123456" },
  { id: 9, name: "Vikram", age: 26, email: "vikram@gmail.com", password: "123456" },
  { id: 10, name: "Sameer", age: 24, email: "sameer@gmail.com", password: "123456" }
];

// 🔹 Root
app.get("/", (req, res) => {
  res.json({
    message: "API is running 🚀",
    endpoints: {
      getUsers: "/users",
      addUser: "POST /users"
    }
  });
});

// 🔹 GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// 🔥 POST (controlled push)
app.post("/users", (req, res) => {
  const { name, age, email, password } = req.body;

  // ✅ validation
  if (!name || !age || !email || !password) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  // ✅ duplicate email check
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      error: "Email already exists"
    });
  }

  // ✅ new user
  const newUser = {
    id: Date.now(), // better unique id
    name,
    age,
    email,
    password
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});