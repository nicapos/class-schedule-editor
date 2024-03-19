const { customAlphabet } = require("nanoid");

const digits = "0123456789";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const customNanoid = () => {
  const generated = customAlphabet(digits + lowercase + uppercase, 10);

  console.log("Generated:" + generated);
};

module.exports = customNanoid;
