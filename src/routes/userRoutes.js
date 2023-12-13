const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/sectionController");

const topicController = require("../controllers/topicController");
const qaController = require("../controllers/qaController");

//View Sections
router.get("/sections", sectionController.getAllSections);
router.get("/sections/:sectionId", sectionController.getSectionById);

// View Topics
router.get("/topics", topicController.getAllTopics);
router.get("/topics/:topicId", topicController.getTopicById);

// View Questions and Answers
router.get("/qa", qaController.getAllQAs);
router.get("/qaById/:qaId", qaController.getQAById);
router.get("/qaByTopic/:topicId", qaController.getQAByTopic);
router.put("/qa/updateViewCount/:qaId", qaController.incrementViewCount);
router.put("/qa/like/:qaId", qaController.likeQA);
router.put("/qa/dislike/:qaId", qaController.dislikeQA);
// Search Questions and Answers
router.get("/qa/search/:query", qaController.searchQAs);

// Get Popular Questions and Answers
router.get("/qa/popular", qaController.getPopularQAs);

module.exports = router;
