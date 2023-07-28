/* Create database */
DROP DATABASE IF EXISTS `student-db`;
CREATE DATABASE IF NOT EXISTS `student-db`;
USE `student-db`;

/* Create students table */
CREATE TABLE IF NOT EXISTS `students`(
    id char(8) NOT NULL PRIMARY KEY,
    firstName varchar(64) NOT NULL,
    lastName varchar(64) NOT NULL
);

/* Populate students table */
INSERT INTO `students` VALUES
('s1234567', 'John', 'Smith'),
('s7654321', 'Jane', 'Doe'),
('s2345678', 'Bob', 'Jones'),
('s8765432', 'Alice', 'Smith');