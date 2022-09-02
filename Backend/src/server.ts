import express from "express";
const cookieParser = require("cookie-parser");
const path = require("path");
const homePageRouter = require("./routes/homePageRouter");
const formsRouter = require("./routes/formsRouter");
const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//   console.log(path.join(__dirname, "../../Frontend/public/"));
//   console.log("---------");
//   console.log(path.resolve("../../Authorization/Frontend/public"));
//   next();
// });
app.use(express.static(path.join(__dirname, "../../Frontend/public/")));
// app.use("/", express.static("../../Authorization/Frontend/public/"));
const port = 3000;
app.use("/", formsRouter);
app.use("/", homePageRouter);
app.listen(port, () => {
  console.log(`server listening on port:${port}`);
});
