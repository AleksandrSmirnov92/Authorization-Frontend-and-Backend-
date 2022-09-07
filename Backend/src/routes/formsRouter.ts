import express from "express";
const path = require("path");
const Router = express.Router();
//  функции
const getForms = (req: any, res: any) => {
  return res.sendFile(
    path.resolve(__dirname, "../../../Frontend/public/formPage/", "index.html")
  );
};

Router.route("/").get(getForms);
module.exports = Router;
