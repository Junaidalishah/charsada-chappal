const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "No user" });
  }

  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};

export default admin;
