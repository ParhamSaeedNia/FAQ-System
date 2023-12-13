const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const sectionController = require("../controllers/sectionController");
const topicController = require("../controllers/topicController");
const qaController = require("../controllers/qaController");
const authenticate = require("../middlewares/authenticationMiddleware");
const authorize = require("../middlewares/authorizationMiddleware");

// Admin Section Routes
router.post("/users", authenticate, authorize, userController.createUser);
// Sections
router.post(
  "/sections",
  authenticate,
  authorize,
  sectionController.createSection
);
router.get(
  "/sections",
  authenticate,
  authorize,
  sectionController.getAllSections
);
router.get(
  "/sections/:sectionId",
  authenticate,
  authorize,
  sectionController.getSectionById
);
router.put(
  "/sections/:sectionId",
  authenticate,
  authorize,
  sectionController.updateSection
);
router.delete(
  "/sections/:sectionId",
  authenticate,
  authorize,
  sectionController.deleteSection
);
router.put(
  "/publishSections/:sectionId",
  authenticate,
  authorize,
  sectionController.publishSection
);
router.put(
  "/draftSections/:sectionId",
  authenticate,
  authorize,
  sectionController.draftSection
);
// Topics

router.post("/topics", authenticate, authorize, topicController.createTopic);
router.get(
  "/topics/:sectionId",
  authenticate,
  authorize,
  topicController.getTopicsBySection
);
router.put(
  "/topics/:topicId",
  authenticate,
  authorize,
  topicController.updateTopic
);
router.delete(
  "/topics/:topicId",
  authenticate,
  authorize,
  topicController.deleteTopic
);

// Questions & Answers
router.post("/qa", authenticate, authorize, qaController.createQA);
router.get("/qa/:topicId", authenticate, authorize, qaController.getQAByTopic);
router.put("/qa/:qaId", authenticate, authorize, qaController.updateQA);
router.delete("/qa/:qaId", authenticate, authorize, qaController.deleteQA);
// Change the sort order of Topics based on Sections
router.put(
  "/sections/:sectionId/topics/order",
  authenticate,
  authorize,
  topicController.updateTopicOrder
);

// Change the sort order of Q&A based on Topics
router.put(
  "/topics/:topicId/qa/order",
  authenticate,
  authorize,
  qaController.updateQAOrder
);

module.exports = router;
