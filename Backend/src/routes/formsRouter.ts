import express from "express";
const path = require("path");
const fs = require("fs");

const Router = express.Router();
//

//  функции
const getForms = (req: any, res: any) => {
  if (!req.cookies.user) {
    console.log(req.cookies);
    console.log("Сверху должна быть кука");
    return res.sendFile(
      path.resolve(
        __dirname,
        "../../../Frontend/public/formPage/",
        "index.html"
      )
    );
    // Добавить поиск по имени хуки
  } else {
    return res.redirect("/home");
  }
};
Router.route("/").get(getForms);
module.exports = Router;
