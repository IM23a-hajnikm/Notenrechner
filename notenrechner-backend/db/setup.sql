-- Drop the database if it already exists-------------------------------------------------------------------------------------------------------------
DROP DATABASE IF EXISTS grade_notebook;

-- Create the database---------------------------------------------------------------------------------------------------------------------------------------
CREATE DATABASE grade_notebook;
USE grade_notebook;

-- Create the users table----------------------------------------------------------------------------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('teacher', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the grades table------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    grade FLOAT NOT NULL,
    semester VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Optional: Create the subjects table----------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data: Insert users----------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO users (name, email, password, role) VALUES
('John Doe', 'john@example.com', 'hashedpassword1', 'student'),
('Jane Smith', 'jane@example.com', 'hashedpassword2', 'teacher');

-- Sample Data: Insert grades-------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO grades (user_id, subject, grade, semester) VALUES
(1, 'Mathematics', 5, 'Fall 2023'),
(1, 'Science', 4, 'Fall 2023'),
(2, 'History', 3, 'Spring 2023');