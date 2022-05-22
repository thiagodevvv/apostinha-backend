const bcrypt = require("bcrypt");
function comparePassword(requestPassword, dbHashPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const isValidPassword = await bcrypt.compare(
        requestPassword,
        dbHashPassword
      );
      if (isValidPassword) resolve(true);
      else resolve(false);
    } catch (err) {
      console.error(err);
      reject();
    }
  });
}

module.exports = comparePassword;
