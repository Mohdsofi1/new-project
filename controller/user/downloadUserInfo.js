import axios from "axios";
import query from "../../db/index.js";

const downloadUserInformation = async (req, res) => {
  const id = req.params.id;
  const dbRes = await query("SELECT * FROM users WHERE id=$1", [id]);
  const userData = dbRes.rows[0];
  axios
    .post("https://pdfgen.app/api/generate?templateId=2ff11f1", userData, {
      headers: {
        "Content-Type": "application/json",
        api_key: "M5MqKijUnEcVtDzZjXg1S",
      },
    })
    .then((resAxios) => {
      console.log(resAxios);
      res.download(resAxios.data);
    })
    .catch((errorAxios) => {
      console.error(errorAxios);
    })
    .finally(() => {});
  // if (dbRes.rows.length === 0) {
  //   const notFoundRes = {
  //     message: "No users found",
  //   };
  //   res.status(404).json(notFoundRes);
  // }
  // const successRes = {
  //   message: `${dbRes.rowCount} users are found`,
  //   data: dbRes.rows[0],
  // };
  // res.status(200).json(successRes);
};

export default downloadUserInformation;
