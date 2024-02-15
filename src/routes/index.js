const { Router } = require("express");
const multer = require("multer");
const { pool } = require("../db");

const router = Router();
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.get("/api/", (req, res) => {
  res.send("Hello World!");
});

router.post("/auth/register", upload.single("avatar"), (req, res) => {
  const { full_name, email, password, phone_number } = req.body;

  if (req.file && req.file.size > upload.limits.fileSize) {
    return res
      .status(400)
      .json({ error: "File size exceeds the limit of 5MB" });
  }

  const regex = {
    email:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    password: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$/,
    phone_number:
      /^\\+[1-9]{1}[0-9]{0,2}-[2-9]{1}[0-9]{2}-[2-9]{1}[0-9]{2}-[0-9]{4}$/,
    full_name: /^[a-z ,.'-]+$/i,
  };

  if (!full_name)
    return res
      .status(400)
      .json({ error: "Missing required field 'full_name'" });

  if (!regex.full_name.test(full_name))
    return res.status(400).json({ error: "Invalid 'full_name' provided" });

  if (!email)
    return res.status(400).json({ error: "Missing required field 'email'" });

  if (!regex.email.test(email))
    return res.status(400).json({ error: "Invalid 'email' provided" });

  if (!password)
    return res.status(400).json({ error: "Missing required field 'password'" });

  if (!regex.password.test(password))
    return res.status(400).json({ error: "Invalid 'password' provided" });

  if (!phone_number)
    return res
      .status(400)
      .json({ error: "Missing required field 'phone_number'" });

  if (!regex.phone_number.test(phone_number))
    return res.status(400).json({ error: "Invalid 'phone_number' provided" });

  const insertQuery =
    "INSERT INTO users (full_name, email, password, phone_num, user_type) VALUES ($1, $2, $3, $4, 'USER') RETURNING *";

  const values = [full_name, email, password, phone_number];

  pool.query(insertQuery, values, (error, result) => {
    if (error) {
      console.error("Error executing query", error);
      return res.status(400).json({ error });
    } else {
      console.log("Inserted data:", result.rows[0]);

      // TODO: return url to profile photo
      res.status(201).json({ data: result.rows[0] });
    }
  });
});

router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const findQuery =
    "SELECT full_name, photo_url, email, user_type FROM users WHERE email = $1 and password = $2;";
  const values = [email, password];

  pool.query(findQuery, values, (error, result) => {
    if (error) {
      console.error("Error executing query", error);
      return res.status(400).json({ error });
    } else {
      res.status(200).json({ data: result.rows[0] });
    }
  });
});

router.get("/user", (req, res) => {});

router.post("/user", (req, res) => {});

router.post("/media", (req, res) => {});

module.exports = router;
