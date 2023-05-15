import jsonwebtoken from "jsonwebtoken";

const generateToken = (res, id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
};

export default generateToken;
