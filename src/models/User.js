const { pool } = require("../db");

const User = {
  create: async (full_name, email, password, phone_number) => {
    const query =
      "INSERT INTO users (full_name, email, password, phone_num, user_type) VALUES ($1, $2, $3, $4, 'USER') RETURNING *";
    const values = [full_name, email, password, phone_number];

    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();

    return result.rows[0];
  },
  findByEmailAndPassword: async (email, password) => {
    const query =
      "SELECT full_name, photo_url, email, user_type FROM users WHERE email = $1 and password = $2;";
    const values = [email, password];

    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();

    return result.rows[0];
  },
};

module.exports = User;
