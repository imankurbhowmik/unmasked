import User from '../models/User.model.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: 'User already exists' });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ msg: 'Invalid credentials' });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("name email createdAt");

  res.json({
    name: user.name,
    email: user.email,
    joinedAt: user.createdAt,
  });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) return res.status(400).json({ msg: "Incorrect current password" });

  const isSame = await user.matchPassword(newPassword);
  if (isSame) return res.status(400).json({ msg: "New password cannot be same as current password" });

  user.password = newPassword; // This will be hashed by pre-save hook
  await user.save();

  res.json({ msg: "Password changed successfully" });
};

