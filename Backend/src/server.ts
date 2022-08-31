import express from "express";
import { nextTick } from "process";
const cookieParser = require("cookie-parser");
const path = require("path");
// const homePageRouter = require("./routes/homePageRouter");
const formsRouter = require("./routes/formsRouter");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(
    path.join(
      __dirname,
      "../../Frontend/node_modules/bootstrap/dist/css/",
      "bootstrap.css"
    )
  );
  next();
});
app.use(
  express.static(
    path.join(__dirname, "../../Frontend/node_modules/bootstrap/dist/css/")
  )
);
app.use(express.static("/../../Frontend/public"));
app.use(
  express.static(
    path.join(__dirname, "../../Frontend/node_modules/bootstrap/dist/js/")
  )
);
const port = 3000;
app.use("/", formsRouter);
// app.use("/", homePageRouter);
app.listen(port, () => {
  console.log(`server listening on port:${port}`);
});
