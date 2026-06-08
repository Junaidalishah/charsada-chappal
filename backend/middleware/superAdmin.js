const superAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "superadmin") {
    return res.status(403).json({
      message: "Super Admin access only",
    });
  }

  next();
};

export default superAdmin;
