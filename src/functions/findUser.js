require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../../database/models/user.js");
const comparePassword = require("./comparePassword.js");
const generatePayload = require("./generatePayload.js");
const generateToken = require("./generateToken.js");
const secret = process.env.SECRET;
async function findUser(userNameOrEmail, password) {
  try {
    const email = userNameOrEmail.split("").includes("@");
    if (email) {
      const user = await User.findAll({
        where: {
          email: userNameOrEmail,
        },
      });
      if (user.length < 1)
        return res.status(404).send("Usuário não encontrado");
      const isValidPassword = await comparePassword(
        password,
        user[0].dataValues.password
      );
      if (isValidPassword) {
        const payload = generatePayload(user[0].dataValues.id);
        const token = generateToken(payload, secret);
        return { token: token };
      } else {
        return false;
      }
    } else {
      const user = await User.findAll({
        where: {
          username: userNameOrEmail,
        },
      });
      if (user.length < 1) {
        return res.status(404).send("Usuário não encontrado");
      }
      const isValidPassword = await comparePassword(
        password,
        user[0].dataValues.password
      );
      if (isValidPassword) {
        const payload = generatePayload(user[0].dataValues.id);
        const token = generateToken(payload, secret);
        return { token: token };
      } else {
        return false;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = findUser;
