import query from "../../db/index.js";

const view = async (req, res) => {
  const username = req.params.username;
  const dbRes = await query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  if (dbRes.rows.length === 0) {
    const notFoundRes = {
      message: "No users found",
    };
    res.status(404).json(notFoundRes);
  }
  const successRes = {
    message: `${dbRes.rowCount} users are found`,
    data: dbRes.rows,
  };
  res.status(200).json(successRes);
};

export default view;
