const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();
const {checkPassword,hashPassword,setCookie,signToken} = require("./user.authFunctions")
const createUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return res
        .status(400)
        .json({ message: "fail", error: "user already exists" });
    }
    let hashedPassword = await hashPassword(password);
    const newUser = await prismaClient.user.create({
      data: {
        email: email,
        password: hashedPassword
      },
    });
    return res.status(200).json({ message: "success", data: [newUser] });
  } catch (err) {
    return res.status(400).json({ message: "fail", error: err });
  }
};signToken

const getUsers = async (req, res, next) => {
  try {
    let users = await prismaClient.user.findMany({});
    if (users.length === 0) {
      return res.status(404).json({ message: "fail", error: "No users found" });
    }
    return res.status(200).json({ message: "success", data: users });
  } catch (err) {
    return res.status(400).json({ message: "fail", error: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        status: "fail",
        message: "Please provide valid email and password",
      });
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
    },
    });
    let isValid = await checkPassword(password, user.password);
    if (!user || !isValid)
      return res
        .status(401)
        .json({ status: "fail", message: "Incorrect email or password" });
    const token = signToken(user.id);
    setCookie(res, token);
    res
      .status(200)
      .json({ status: "success", data: { token: token, user: user } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

const logout = () => {
  return async (req, res, next) => {
    try {
      res.clearCookie("jwt");
      res
        .status(200)
        .json({ status: "success", message: `user logged out successfully` });
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { getUsers, createUser, login,logout };
