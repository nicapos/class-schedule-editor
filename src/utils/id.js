const { customAlphabet } = require('nanoid');

const digits = "0123456789";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const nanoid = customAlphabet(digits + lowercase + uppercase, 10);

module.exports = nanoid;