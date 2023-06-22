import jwt from "jsonwebtoken";
const logout = (req, res) => {
  const TOKEN_SECRET = "09f26e402586e2faa8da4c98a35f1b20d6b033c60";
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  jwt.sign(authHeader, TOKEN_SECRET, { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.status(200).json({ msg: "You have been logged out" });
    } else {
      res.status(500).json({ msg: "error" });
    }
  });
};

export default logout;
