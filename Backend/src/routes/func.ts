const path = require("path");
const fs = require("fs");
const AllUser = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "../../dev-data", "/AuthUser.json")}`)
);
exports.searhUserCookie = (cookie: string) => {
  for (let item of AllUser) {
    if (item.Login === cookie) {
      return true;
    }
  }
  return false;
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
      Email,
    }
  );
  return newUser;
};
exports.searchLogin = (Login: string) => {
  let massivLogin = [];
  for (let item of AllUser) {
    massivLogin.push(item.Login);
  }
  let includes = massivLogin.includes(Login);
  if (includes) {
    return false;
  } else {
    return true;
  }
};
exports.searchEmail = (Email: string) => {
  let massivEmail = [];
  for (let item of AllUser) {
    massivEmail.push(item.Email);
  }
  let includes = massivEmail.includes(Email);
  if (includes) {
    return false;
  } else {
    return true;
  }
};
