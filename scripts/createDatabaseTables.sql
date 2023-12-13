-- createDatabaseTables.sql

-- Sections table
CREATE TABLE Sections (
  sectionId INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  isDraft BOOLEAN NOT NULL DEFAULT true
);

-- Topics table
CREATE TABLE Topics (
  topicId INT PRIMARY KEY AUTO_INCREMENT,
  sectionId INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  isDraft BOOLEAN NOT NULL DEFAULT true,
  sortOrder INT DEFAULT 0,
  FOREIGN KEY (sectionId) REFERENCES Sections(sectionId)
);

-- QA (Questions & Answers) table
CREATE TABLE QA (
  qaId INT PRIMARY KEY AUTO_INCREMENT,
  topicId INT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  viewCount INT DEFAULT 0,
  likeCount INT DEFAULT 0,
  dislikeCount INT DEFAULT 0,
  isDraft BOOLEAN NOT NULL DEFAULT true,
  sortOrder INT DEFAULT 0,
  FOREIGN KEY (topicId) REFERENCES Topics(topicId)
);

-- Users table
CREATE TABLE Users (
  userId INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL, -- You might have different statuses like 'registered', 'active', etc.
);

-- Groups table
CREATE TABLE `Groups` (
  groupId INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
);

-- UserGroups table (to represent the many-to-many relationship between Users and Groups)
CREATE TABLE UserGroups (
  userId INT,
  groupId INT,
  PRIMARY KEY (userId, groupId),
  FOREIGN KEY (userId) REFERENCES Users(userId),
  FOREIGN KEY (groupId) REFERENCES `Groups`(groupId)
);
