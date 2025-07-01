-- Create the database (have to run this in pgAdmin4)
-- CREATE DATABASE "BlogDB";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create blogs table
CREATE TABLE blogs (
    blog_id SERIAL PRIMARY KEY,
    creator_name VARCHAR(255) NOT NULL,
    creator_user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    category VARCHAR(255),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Insert sample users (passwords are hashed versions of 'password123')
INSERT INTO users (user_id, password, name) VALUES
('admin', '$2b$10$rQZ8K9mN2pL1vX3yU6wA7eB4cD5fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7z', 'Admin User'),
('john_doe', '$2b$10$rQZ8K9mN2pL1vX3yU6wA7eB4cD5fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7z', 'John Doe'),
('jane_smith', '$2b$10$rQZ8K9mN2pL1vX3yU6wA7eB4cD5fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7z', 'Jane Smith');

-- Insert sample blogs
INSERT INTO blogs (creator_name, creator_user_id, title, body, category) VALUES
('Admin User', 'admin', 'Welcome to Our Blog', 'This is the first blog post on our platform. We are excited to share our thoughts and ideas with you!', 'General'),
('John Doe', 'john_doe', 'Getting Started with Node.js', 'Node.js is a powerful JavaScript runtime that allows you to build scalable server-side applications. In this post, we will explore the basics of Node.js and how to get started.', 'Tech'),
('Jane Smith', 'jane_smith', 'Healthy Living Tips', 'Maintaining a healthy lifestyle is crucial for our well-being. Here are some practical tips that you can incorporate into your daily routine.', 'Lifestyle'),
('Admin User', 'admin', 'The Future of Web Development', 'Web development is constantly evolving with new technologies and frameworks emerging regularly. Let us explore what the future holds for web developers.', 'Tech'),
('John Doe', 'john_doe', 'Learning Programming', 'Programming can seem daunting at first, but with the right approach and resources, anyone can learn to code effectively.', 'Education'); 