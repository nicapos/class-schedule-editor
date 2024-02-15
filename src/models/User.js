const { pool } = require("../db");

const User = {
  create: async (
    full_name,
    email,
    password,
    phone_number,
    photo_url = null
  ) => {
    const query =
      photo_url == null
        ? "INSERT INTO users (full_name, email, password, phone_num, user_type) VALUES ($1, $2, $3, $4, 'USER') RETURNING *"
        : "INSERT INTO users (full_name, email, password, phone_num, photo_url, user_type) VALUES ($1, $2, $3, $4, $5, 'USER') RETURNING *";

    const values =
      photo_url == null
        ? [full_name, email, password, phone_number]
        : [full_name, email, password, phone_number, photo_url];

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
  findByEmailAndId: async (email, id) => {
    const query =
      "SELECT full_name, photo_url, email, user_type FROM users WHERE email = $1 and id = $2;";
    const values = [email, id];

    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();

    return result.rows[0];
  },
  getAll: async () => {
    const query =
      "SELECT full_name, photo_url, email, phone_num, user_type FROM users";

    const client = await pool.connect();
    const result = await client.query(query);
    client.release();

    return result.rows;
  },
};

module.exports = User;
