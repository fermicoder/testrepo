const express = require("express");
const morgan = require("morgan");
const conf = require("config");
const dbDebugger = require("debug")("app:db");
const startupDebugger = require("debug")("app:startup");
const app = new express();
const courseHandler = require("./routes/courses");
const homeHandler = require("./routes/home");
const loggerMiddleware = require("./middlewares/logger");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//installing looger mdlware

app.use(loggerMiddleware);

app.use(morgan("tiny"));
//configuration
dbDebugger(`password is  +++++ ${conf.get("mail.password")}`);
app.use("/courses", courseHandler);
app.use("/", homeHandler);
//logging db
dbDebugger("db work is done ");
//
startupDebugger("startup work is done");

console.log(`logging is : ${process.env.NODE_ENV}`);
console.log(`${app.get("env")}`);
const port = process.env.PORT || 1000;

app.listen(port, () => console.log("listening..."));
