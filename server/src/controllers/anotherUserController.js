import User from "../models/User.model.js";

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID and exclude password
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
