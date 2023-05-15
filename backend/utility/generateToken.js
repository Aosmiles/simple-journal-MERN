import jsonwebtoken from "jsonwebtoken";

const expireDays = 14;

const generateToken = (res, id) => {
  const token = jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: `${expireDays}d`,
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: expireDays * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
