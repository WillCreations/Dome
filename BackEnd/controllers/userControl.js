const User = require("../database/userSchema");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  console.log("created token: ", token);
  return token;
};

//get all user
const getUsers = async (req, res) => {
  try {
    const user = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

//get a single user

const singleUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "IDDDD");
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch singleuser " });
  }
};

//create new user

const createUser = async (req, res) => {
  try {
    console.log("body: ", req.body);
    const { name, email, password } = req.body;

    console.log(name, email, password);

    const user = await User.Signup(name, email, password);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to post" });
  }
};

//delete a user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "IDDDD");
    const user = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

//update a user
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
     console.log(update, "update");
    console.log(id, "IDDDD");
    const user = await User.findByIdAndUpdate(id, update);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user " });
  }
};

// Signup
const Signup = async (req, res) => {
  try {
    console.log("body: ", req.body);
    const { name, email, password } = req.body;

    console.log(name, email, password);

    const user = await User.Signup(name, email, password);
    console.log("user: ", user);
    const token = createToken(user._id);

    res.status(200).json({ user, token, message: "Successfully signed up" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
const Login = async (req, res) => {
  try {
    console.log("body: ", req.body);
    const { email, password } = req.body;

    console.log(email, password);

    const user = await User.Login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ user, token, message: "Successfully signed up" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  singleUser,
  deleteUser,
  updateUser,
  Signup,
  Login,
};
