-- Define ENUM type
CREATE TYPE userType AS ENUM ('ADMIN', 'USER');

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.files;
DROP TABLE IF EXISTS public.classes;
DROP TABLE IF EXISTS public.schedules;
DROP TABLE IF EXISTS public.users;

-- Create tables
CREATE TABLE public.files (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.users (
    id UUID PRIMARY KEY,
    "fullName" VARCHAR(255) NOT NULL,
    email VARCHAR(320) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(13) NOT NULL,
    "photoUrl" VARCHAR(255),
    "userType" userType NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_email_key UNIQUE (email)
);

CREATE TABLE public.schedules (
    id VARCHAR(10) PRIMARY KEY,
    "name" VARCHAR(32),
    "userId" UUID,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "schedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE
);

CREATE TABLE public.classes (
    id SERIAL PRIMARY KEY,
    "className" VARCHAR(255) NOT NULL,
    "day" VARCHAR(32) NOT NULL,
    "startTime" VARCHAR(5) NOT NULL,
    "endTime" VARCHAR(5) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "scheduleId" VARCHAR(10),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "classes_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES public.schedules(id) ON UPDATE CASCADE
);
