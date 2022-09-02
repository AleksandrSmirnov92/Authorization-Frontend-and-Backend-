import express from "express";
const path = require("path");
const fs = require("fs");
const { searhUser } = require("./func");
const Router = express.Router();
const AllUser = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "../../dev-data", "/AuthUser.json")}`)
);
//  функции
const getForms = (req: any, res: any) => {
  return res.sendFile(
    path.resolve(__dirname, "../../../Frontend/public/formPage/", "index.html")
  );
  // Добавить поиск по имени хуки
};

Router.route("/").get(getForms);
module.exports = Router;
