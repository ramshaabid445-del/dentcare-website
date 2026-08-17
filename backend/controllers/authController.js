import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Always create as "user" role - never accept role from frontend
    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error during signup" });
  }
};

// @desc    Login user / admin
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error during login" });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      profileImage: req.user.profileImage,
      createdAt: req.user.createdAt,
    },
  });
};

// @desc    Logout (client-side token removal)
// @route   POST /api/auth/logout
// @access  Private
export const logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

export const updateMyProfile = async (req, res) => {
  const { name, currentPassword, newPassword, profileImage } = req.body;
  try {
    const user = await User.findById(req.user._id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });
    if (name?.trim()) user.name = name.trim();
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (newPassword) {
      if (!currentPassword || !(await user.matchPassword(currentPassword))) return res.status(400).json({ message: "Current password is incorrect" });
      if (newPassword.length < 6) return res.status(400).json({ message: "New password must be at least 6 characters" });
      user.password = newPassword;
    }
    await user.save();
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage, createdAt: user.createdAt } });
  } catch (error) { res.status(500).json({ message: error.message || "Failed to update profile" }); }
};
