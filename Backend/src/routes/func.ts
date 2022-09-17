import { Request, Response } from "express";
const path = require("path");
const fs = require("fs");
const AllUser = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "../../dev-data", "/AuthUser.json")}`)
);
exports.searhUserCookie = (cookie: string) => {
  // for (let item of AllUser) {
  //   if (item.Login === cookie) {
  //     return true;
  //   }
  // }
  // return false;
  return AllUser.find((el: { Login: string }) => el.Login === cookie);
};
exports.createNewUser = (
  Login: string,
  Password: string | number,
  Email: string
) => {
  let newUser = Object.assign(
    { id: Math.random() },
    {
      Login,
      Password,
      Email: Email.toLowerCase(),
    }
  );
  return newUser;
};
exports.searchLogin = (Login: string) => {
  // let massivLogin = [];
  // for (let item of AllUser) {
  //   massivLogin.push(item.Login);
  // }
  // let includes = massivLogin.includes(Login);
  // if (includes) {
  //   return false;
  // } else {
  //   return true;
  // }
  return !AllUser.map((item: { Login: string }) => item.Login).includes(Login);
};
exports.searchEmail = (Email: string) => {
  // let massivEmail = [];
  // for (let item of AllUser) {
  //   massivEmail.push(item.Email);
  // }
  // let includes = massivEmail.includes(Email.toLowerCase());
  // if (includes) {
  //   return false;
  // } else {
  //   return true;
  // }
  return !AllUser.map((item: { Email: string }) => item.Email).includes(
    Email.toLocaleLowerCase()
  );
};
