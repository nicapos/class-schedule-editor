DO $$ BEGIN
    CREATE TYPE ACCOUNT_TYPE AS ENUM('ADMIN', 'USER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    full_name   VARCHAR(255) NOT NULL,
    email       VARCHAR(320) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    phone_num   VARCHAR(13) NOT NULL,
    photo_url   VARCHAR(255),
    user_type   ACCOUNT_TYPE NOT NULL
);

DO $$ BEGIN
    CREATE TYPE WEEK_DAY AS ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS class_items (
    id          SERIAL PRIMARY KEY,
    class_name  VARCHAR(255) NOT NULL,
    day         WEEK_DAY NOT NULL,
    start_time  VARCHAR(5) NOT NULL,
    end_time    VARCHAR(5) NOT NULL,
    location    VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS class_schedule (
    id          SERIAL PRIMARY KEY,
    user_id     INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES class_items(id)
);
