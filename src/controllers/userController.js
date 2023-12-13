const UserModel = require("../models/User");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, status } = req.body;
    const newUser = await UserModel.createUser(username, email, status);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.getUserById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password, status } = req.body;

    const updatedUser = await UserModel.updateUser(
      userId,
      username,
      email,
      password,
      status
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await UserModel.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
