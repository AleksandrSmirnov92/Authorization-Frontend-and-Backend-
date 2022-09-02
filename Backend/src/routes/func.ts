const path = require("path");
const fs = require("fs");
const AllUser = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "../../dev-data", "/AuthUser.json")}`)
);
exports.searhUser = (cookie: string) => {
  for (let item of AllUser) {
    if (item.Login === cookie) {
      return true;
    }
    return false;
  }
};
