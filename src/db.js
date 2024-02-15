const Pool = require("pg-pool");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Add tables to database (if not exists)
const initDBpath = path.join(__dirname, "init.sql");
const initDB = fs.readFileSync(initDBpath, "utf-8");

async function initializeDB() {
  try {
    const client = await pool.connect();
    await client.query(initDB);
    client.release();
  } catch (error) {
    console.error("Error: Failed to initialize database.", error);
  }
}

module.exports = {
  pool,
  init: initializeDB,
};
