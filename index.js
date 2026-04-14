import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const users = [
  { id: 1, name: "Kaif", age: 22 },
  { id: 2, name: "Ali", age: 23 },
  { id: 3, name: "Rahul", age: 21 },
  { id: 4, name: "Aman", age: 24 },
  { id: 5, name: "Zaid", age: 22 },
  { id: 6, name: "Rohit", age: 25 },
  { id: 7, name: "Imran", age: 23 },
  { id: 8, name: "Arjun", age: 22 },
  { id: 9, name: "Vikram", age: 26 },
  { id: 10, name: "Sameer", age: 24 }
];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/", (req, res) => {
  res.send(`API is running 🚀${PORT}`);
});
// POST new user
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.json(newUser);
});



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});