import express, { Request, Response } from "express";
const path = require("path");
const Router = express.Router();
const fs = require("fs");
const {
  searhUserCookie,
  createNewUser,
  searchLogin,
  searchEmail,
} = require("./func");
const AllUser = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "../../dev-data", "/AuthUser.json")}`)
);

const getHomePage = (req: Request, res: Response) => {
  console.log(req.cookies.username);

  if (searhUserCookie(req.cookies.username)) {
    return res.sendFile(
      path.resolve(
        __dirname,
        "../../../Frontend/public/homePage/",
        "homepage.html"
      )
    );
  } else {
    res.redirect("/");
  }
};
interface State {
  Login: string;
  Password: string | number;
  Repeat_password: string | number;
  Email: string;
}

const postHomePage = (
  req: Request<{}, {}, { nameClassButton: string; state: State }>,
  res: Response<{ status: string; body: {}; message: string }>
) => {
  if (req.body.nameClassButton === "Sign_in") {
    console.log("Мы работаем с формой регистрации");
    let { Login, Password, Repeat_password, Email } = req.body.state;
    if (Login && Password && Repeat_password && Email) {
      if (searchLogin(Login)) {
        if (searchEmail(Email)) {
          AllUser.push(createNewUser(Login, Password, Email));
          fs.writeFile(
            `${path.join(__dirname, "../../dev-data", "/AuthUser.json")}`,
            JSON.stringify(AllUser),
            (err: Error) => {
              if (err) {
                console.log(err);
              } else {
                return res
                  .status(201)
                  .cookie("username", `${Login}`, {
                    maxAge: 180000,
                  })
                  .json({
                    status: "SUCCESS",
                    body: createNewUser(Login, Password, Email),
                    message: "",
                  });
              }
            }
          );
        } else {
          return res.status(404).json({
            status: "ERROR",
            body: {},
            message: "Такой Email уже зарегестрирован",
          });
        }
      } else {
        return res.status(404).json({
          status: "ERROR",
          body: {},
          message: "Такой пользователь уже существует",
        });
      }
    } else {
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: "Заполните форму до конца",
      });
    }
  }
  if (req.body.nameClassButton === "Sign_up") {
    console.log("Мы работаем с формой входа");
    let { Login, Email, Password } = req.body.state;
    if (Email && Password) {
      console.log("Мы работаем с Email");
      for (let item of AllUser) {
        if (item.Email === Email.toLowerCase()) {
          if (String(item.Password) === Password) {
            return res
              .status(200)
              .cookie("username", `${item.Login}`, { maxAge: 180000 })
              .json({
                status: "SUCCESS",
                body: {},
                message: `С возвращением ${item.Login}`,
              });
            // Доделать куки
          } else {
            return res.status(404).json({
              status: "ERROR",
              body: {},
              message: "Неправильно введен Password",
            });
          }
        }
      }
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: "Неправильно введен Email",
      });
    } else if (Login && Password) {
      console.log("Мы работаем с Login");
      for (let item of AllUser) {
        if (item.Login === Login) {
          if (String(item.Password) === Password) {
            return res
              .status(200)
              .cookie("username", `${item.Login}`, { maxAge: 180000 })
              .json({
                status: "SUCCESS",
                body: {},
                message: `С возвращением ${item.Login}`,
              });
          } else {
            return res.status(404).json({
              status: "ERROR",
              body: {},
              message: "Неправильно введен Password ",
            });
          }
        }
      }
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: "Неправильно введен Login",
      });
    } else {
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: "Ошибка заполнения формы",
      });
    }
  }
};

Router.route("/home").get(getHomePage).post(postHomePage);
module.exports = Router;
