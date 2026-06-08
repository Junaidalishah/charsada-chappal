import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
// ================= SIGNUP =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // TOKEN
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GOOGLE AUTH =================
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    // EMAIL REQUIRED
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // CHECK USER
    let user = await User.findOne({ email });

    // CREATE USER IF NOT EXISTS
    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google-auth-user",
      });
    }

    // TOKEN
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    );

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Google authentication failed",
    });
  }
};

// ================= GET PROFILE =================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      isAdmin: user.isAdmin,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE PROFILE =================
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || "";
    user.address = req.body.address || "";

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= CHANGE PASSWORD =================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Google-created account (first password setup)
    if (user.password === "google-auth-user") {
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(newPassword, salt);

      await user.save();

      return res.json({
        message: "Password created successfully",
      });
    }

    // Existing password users
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Create Admin
// ================= CREATE / PROMOTE ADMIN =================
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    // CASE 1: USER EXISTS → PROMOTE TO ADMIN
    if (user) {
      user.isAdmin = true;
      user.role = "admin"; // optional if using role system

      // if password is empty or google user, set password
      if (!user.password || user.password === "google-auth-user") {
        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed;
      }

      await user.save();

      return res.json({
        message: "User promoted to admin successfully",
        user,
      });
    }

    // CASE 2: USER DOES NOT EXIST → CREATE NEW ADMIN
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
      role: "admin",
    });

    res.json({
      message: "Admin created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all admins
export const getAdmins = async (req, res) => {
  const admins = await User.find({ isAdmin: true });
  res.json(admins);
};

//delete admin

export const deleteAdmin = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Admin deleted" });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      html: `
    <h2>Password Reset Request</h2>
    <p>Click below to reset password:</p>

    <a href="${resetUrl}">
      Reset Password
    </a>

    <p>This link expires in 15 minutes.</p>
  `,
    });

    res.json({
      message: "Password reset email sent",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const resetPasswordToken = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
