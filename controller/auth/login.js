import query from "../../db/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const TOKEN_SECRET = "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

const generateAccessToken = (username) => {
  return jwt.sign(username, TOKEN_SECRET, { expiresIn: "1800s" });
};

const login = async (req, res) => {
  const body = req.body;
  // query database for  user by email then compare the password
  try {
    const user = await query(
      "SELECT * FROM users WHERE username=$1 OR email=$1",
      [body.identifier]
    ).then((res) => {
      if (res.rowCount > 0) {
        return res.rows[0];
      } else {
        throw res;
      }
    });

    // decrypt the hash from db and compare
    bcrypt.compare(body.password, user.password, (error, bcryptRes) => {
      if (bcryptRes) {
        const token = generateAccessToken({
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isadmin,
        });

        const serverRes = {
          message: "Login successfull",
          data: user,
          jwt: token,
        };
        res.status(200).json(serverRes);
      } else {
        const serverRes = {
          massage: "login unsuccessfull",
          error: "invalid credential",
        };
        res.status(401).json(serverRes);
      }
    });
  } catch (error) {
    const serverRes = {
      massage: "invalid request",
      error: "invalid identifier",
    };
    res.status(403).json(serverRes);
  }
};

export default login;
