const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorised" });
  }
};

export default isAdmin;
