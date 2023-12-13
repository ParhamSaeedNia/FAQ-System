-- Insert sample data for Sections
INSERT INTO Sections (name) VALUES
('Getting Started'),
('Advanced Topics'),
('Troubleshooting');

-- Insert sample data for Topics
INSERT INTO Topics (sectionId, name, sortOrder) VALUES
(1, 'Introduction to the System', 1),
(1, 'Installation Guide', 2),
(2, 'Security Best Practices', 1),
(2, 'Performance Optimization', 2),
(3, 'Common Issues', 1),
(3, 'Error Code Reference', 2);

-- Insert sample data for Questions and Answers
INSERT INTO QA (topicId, question, answer, isDraft, viewCount, likeCount, dislikeCount, sortOrder) VALUES
(1, 'What is the purpose of this system?', 'This system is designed to...', false, 150, 30, 5, 1),
(1, 'How do I install the system?', 'To install the system, follow these steps...', true, 100, 20, 2, 2),
(2, 'How can I improve system security?', 'To enhance security, consider implementing...', false, 200, 40, 10, 1),
(2, 'What are the recommended performance optimization techniques?', 'To optimize performance, you can...', false, 180, 25, 8, 2),
(3, 'Im encountering an issue with XYZ. How can I resolve it?', 'If youre facing issues with XYZ, try...', true, 50, 10, 2, 1),
(3, 'What does error code 123 mean?', 'Error code 123 indicates...', false, 80, 15, 5, 2);

-- Insert sample data for Users
INSERT INTO Users (username, email, status) VALUES
('admin', 'admin@example.com', 'active'),
('user1', 'user1@example.com', 'active'),
('user2', 'user2@example.com', 'active');

-- Insert sample data for Groups
INSERT INTO Groups (name) VALUES
('Admins'),
('Users');

-- Insert sample data for UserGroups
INSERT INTO UserGroups (userId, groupId) VALUES
(1, 1), -- admin is part of Admins group
(2, 2), -- user1 is part of Users group
(3, 2); -- user2 is also part of Users group

-- Add more sample data as needed
