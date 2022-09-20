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
  Password: string;
  Repeat_password: string;
  Email: string;
  LoginOrEmail: string;
  InputName: string;
}
const postHomePage = (
  req: Request<{}, {}, { nameClassButton: string; state: State }>,
  res: Response<{ status: string; body: {}; message: string }>
) => {
  if (req.body.nameClassButton === "Sign_in") {
    console.log("Мы работаем с формой регистрации");
    let { Login, Password, Repeat_password, Email } = req.body.state;
    if (!(Login && Password && Repeat_password && Email)) {
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: "Заполните форму до конца",
      });
    }
    if (!searchLogin(Login)) {
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: "Такой пользователь уже существует",
      });
    }
    if (!searchEmail(Email)) {
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: "Такой Email уже зарегестрирован",
      });
    }
    AllUser.push(createNewUser(Login, Password, Email));
    addUserInData(res, Login, Password, Email);
  }
  if (req.body.nameClassButton === "Sign_up") {
    console.log("Мы работаем с формой входа");
    let { LoginOrEmail, InputName, Password } = req.body.state;
    if (!(LoginOrEmail && Password)) {
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: "Ошибка заполнения формы",
      });
    }
    // console.log(LoginOrEmail, InputName);
    // console.log(searchEmailOrLogin(LoginOrEmail, InputName));
    if (!searchEmailOrLogin(LoginOrEmail, InputName)) {
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: `Неправильно введен ${InputName}`,
      });
    }
    console.log(searchPassword(LoginOrEmail, InputName, Password));
    if (searchPassword(LoginOrEmail, InputName, Password) === false) {
      return res.status(404).json({
        status: "ERROR",
        body: {},
        message: "Неправильно введен Password",
      });
    }
    return res
      .status(200)
      .cookie("username", `${returnLogin(LoginOrEmail, InputName)}`, {
        maxAge: 180000,
      })
      .json({
        status: "SUCCESS",
        body: {},
        message: `С возвращением ${returnLogin(LoginOrEmail, InputName)}`,
      });
  }

  // let { Login, Email, Password } = req.body.state;
  //   if (Email && Password) {
  //     console.log("Мы работаем с Email");
  //     for (let item of AllUser) {
  //       if (item.Email === Email.toLowerCase()) {
  //         if (String(item.Password === Password)) {
  //           return res
  //             .status(200)
  //             .cookie("username", `${item.Login}`, { maxAge: 180000 })
  //             .json({
  //               status: "SUCCESS",
  //               body: {},
  //               message: `С возвращением ${item.Login}`,
  //             });
  //           // Доделать куки
  //         } else {
  //           return res.status(404).json({
  //             status: "ERROR",
  //             body: {},
  //             message: "Неправильно введен Password",
  //           });
  //         }
  //       }
  //     }
  //     return res.status(404).json({
  //       status: "ERROR",
  //       body: {},
  //       message: "Неправильно введен Email",
  //     });
  //   } else if (Login && Password) {
  //     console.log("Мы работаем с Login");
  //     for (let item of AllUser) {
  //       if (item.Login === Login) {
  //         console.log(String(item.Password === Password));
  //         if (String(item.Password === Password)) {
  //           return res
  //             .status(200)
  //             .cookie("username", `${item.Login}`, { maxAge: 180000 })
  //             .json({
  //               status: "SUCCESS",
  //               body: {},
  //               message: `С возвращением ${item.Login}`,
  //             });
  //         } else {
  //           return res.status(404).json({
  //             status: "ERROR",
  //             body: {},
  //             message: "Неправильно введен Password ",
  //           });
  //         }
  //       }
  //     }
  //     return res.status(404).json({
  //       status: "ERROR",
  //       body: {},
  //       message: "Неправильно введен Login",
  //     });
  //   } else {
  //     return res.status(404).json({
  //       status: "ERROR",
  //       body: {},
  //       message: "Ошибка заполнения формы",
  //     });
  //   }
  // }
};

Router.route("/home").get(getHomePage).post(postHomePage);
module.exports = Router;
function addUserInData(
  res: Response,
  Login: string,
  Password: string,
  Email: string
) {
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
}
function searchEmailOrLogin(LoginOrEmail: string, InputName: string) {
  let massivValues: any = [];
  if (InputName === "Login") {
    for (let item of AllUser) {
      massivValues = Object.values(item);
      if (massivValues.includes(LoginOrEmail)) {
        return massivValues.includes(LoginOrEmail);
      }
    }
  }
  if (InputName === "Email") {
    for (let item of AllUser) {
      massivValues = Object.values(item);
      if (massivValues.includes(LoginOrEmail.toLowerCase())) {
        return massivValues.includes(LoginOrEmail.toLowerCase());
      }
    }
  }
  // console.log(massivValues);
  return massivValues.includes(LoginOrEmail);
}

function searchPassword(
  LoginAndEmail: string,
  InputName: string,
  Password: string
) {
  let massivValues: any = [];
  if (InputName === "Login") {
    for (let item of AllUser) {
      massivValues = Object.values(item);
      console.log(massivValues, Password);
      if (massivValues.includes(LoginAndEmail)) {
        return massivValues.includes(Password);
      }
    }
  }
  if (InputName === "Email") {
    for (let item of AllUser) {
      massivValues = Object.values(item);
      if (massivValues.includes(LoginAndEmail.toLowerCase())) {
        return massivValues.includes(Password);
      }
    }
  }
  return massivValues.includes(Password);
}
function returnLogin(LoginOrEmail: string, InputName: string) {
  if (InputName === "Login") {
    for (let item of AllUser) {
      if (Object.values(item).includes(LoginOrEmail)) {
        return item.Login;
      }
    }
  }
  if (InputName === "Email") {
    for (let item of AllUser) {
      if (Object.values(item).includes(LoginOrEmail.toLowerCase())) {
        return item.Login;
      }
    }
  }
}
