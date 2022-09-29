import { Request, Response } from "express";
const path = require("path");
const fs = require("fs");
const AllUser = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "../../dev-data", "/AuthUser.json")}`)
);
exports.searhUserCookie = (cookie: string) => {
  return AllUser.find((el: { Login: string }) => el.Login === cookie);
};
exports.createNewUser = (
  Login: string,
  Password: string | number,
  Email: string
) => {
  let newUser = Object.assign(
    { id: String(Math.random()) },
    {
      Login,
      Password,
      Email: Email.toLowerCase(),
    }
  );
  return newUser;
};
exports.searchLogin = (Login: string) => {
  return !AllUser.map((item: { Login: string }) => item.Login).includes(Login);
};
exports.searchEmail = (Email: string) => {
  return !AllUser.map((item: { Email: string }) => item.Email).includes(
    Email.toLocaleLowerCase()
  );
};
exports.searchEmailOrLogin = (LoginOrEmail: string, InputName: string) => {
  if (InputName === "Login") {
    return AllUser.map((el: { Login: string }) => el.Login).includes(
      LoginOrEmail
    );
  }
  if (InputName === "Email") {
    return AllUser.map((el: { Email: string }) => el.Email).includes(
      LoginOrEmail.toLowerCase()
    );
  }
};
exports.searchPassword = (
  LoginOrEmail: string,
  InputName: string,
  Password: string
) => {
  if (InputName === "Login") {
    return Object.values(
      AllUser.find((x: { Login: string }) => x.Login === LoginOrEmail)
    ).includes(Password);
  }
  if (InputName === "Email") {
    return Object.values(
      AllUser.find(
        (x: { Email: string }) => x.Email === LoginOrEmail.toLowerCase()
      )
    ).includes(Password);
  }
};
exports.returnLogin = (
  LoginOrEmail: string,
  InputName: string
): string | undefined => {
  if (InputName === "Login") {
    console.log(
      AllUser.find((x: { Login: string }) => x.Login === LoginOrEmail).Login
    );
    return AllUser.find((x: { Login: string }) => x.Login === LoginOrEmail)
      .Login;
  }
  if (InputName === "Email") {
    return AllUser.find(
      (x: { Email: string }) => x.Email === LoginOrEmail.toLowerCase()
    ).Login;
  }
};
