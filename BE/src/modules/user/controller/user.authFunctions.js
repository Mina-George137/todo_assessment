const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = function (id) {
  return jwt.sign({ id, isLoggedIn: true }, process.env.JWTKEY, {
    expiresIn: "90d",
  });
};

const setCookie = function (res, token) {
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
};

const checkPassword =  async function (password, hashed_password) {
    console.log(await bcrypt.compare(password, hashed_password))
    return await bcrypt.compare(password, hashed_password)
}
const hashPassword = async (password) => {
  password = await bcrypt.hash(password, parseInt(process.env.SALT));
  return password;
};

module.exports = {checkPassword,hashPassword,setCookie,signToken}