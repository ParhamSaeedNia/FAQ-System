const TopicModel = require("../models/Topic");

// Create a new topic
exports.createTopic = async (req, res) => {
  try {
    const { sectionId, name, description, isDraft, sortOrder } = req.body;
    const newTopic = await TopicModel.createTopic(
      sectionId,
      name,
      description,
      isDraft,
      sortOrder
    );
    res.status(201).json(newTopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await TopicModel.getAllTopics();
    res.status(200).json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get topics by Section
exports.getTopicsBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const topics = await TopicModel.getTopicsBySection(sectionId);
    res.status(200).json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get topic by ID
exports.getTopicById = async (req, res) => {
  try {
    const { topicId } = req.params;
    const topic = await TopicModel.getTopicById(topicId);

    if (!topic) {
      res.status(404).json({ error: "Topic not found" });
    } else {
      res.status(200).json(topic);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update topic by ID
exports.updateTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { name, description, isDraft, sortOrder } = req.body;

    const updatedTopic = await TopicModel.updateTopic(
      topicId,
      name,
      description,
      isDraft,
      sortOrder
    );
    res.status(200).json(updatedTopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete topic by ID
exports.deleteTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    await TopicModel.deleteTopic(topicId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTopicOrder = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { topicOrder } = req.body;
    await TopicModel.updateTopicOrder(sectionId, topicOrder);
    res.status(200).json({ message: "Topic order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
