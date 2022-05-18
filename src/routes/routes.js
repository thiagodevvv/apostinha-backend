const express = require("express");
const app = express.Router();
const { SignUp, SignIn, ForgetPass, NewPass, Logout } = require("../api/users");
const { ActiveAccount } = require("../api/ativar");
const { middlewareAuth } = require("../middlewares/auth");

app.use((req, res, next) => {
  console.log(`Called endpoint: ${req.path} with method: ${req.method}`);
  next();
});

app.post("/signup", (req, res) => SignUp(req, res));
app.get("/ativar/:token", (req, res) => ActiveAccount(req, res));
app.post("/signin", (req, res) => SignIn(req, res));
app.post("/logout", middlewareAuth, (req, res) => Logout(req, res));
app.post("/forgetpass", (req, res) => ForgetPass(req, res));
app.post("/newpass", (req, res) => NewPass(req, res));
module.exports = app;
