const QAModel = require("../models/QA");

// Create a new Q&A
exports.createQA = async (req, res) => {
  try {
    const { topicId, question, answer, isDraft, sortOrder } = req.body;
    const newQA = await QAModel.createQA(
      topicId,
      question,
      answer,
      isDraft,
      sortOrder
    );
    res.status(201).json(newQA);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllQAs = async (req, res) => {
  try {
    const qas = await QAModel.getAllQAs();
    res.status(200).json(qas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Q&A by Topic
exports.getQAByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const qaList = await QAModel.getQAByTopic(topicId);
    res.status(200).json(qaList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getQAById = async (req, res) => {
  try {
    const { qaId } = req.params;
    const qaList = await QAModel.getQAById(qaId);
    res.status(200).json(qaList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Q&A by ID
exports.updateQA = async (req, res) => {
  try {
    const { qaId } = req.params;
    const { question, answer, isDraft } = req.body;

    const updatedQA = await QAModel.updateQA(qaId, question, answer, isDraft);
    res.status(200).json(updatedQA);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// exports.updateQADraftStatus = async (req, res) => {
//   try {
//     const { qaId } = req.params;
//     const { isDraft } = req.body;
//     const updatedQA = await QAModel.updateQA(qaId, null, null, isDraft);
//     res.status(200).json(updatedQA);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Delete Q&A by ID
exports.deleteQA = async (req, res) => {
  try {
    const { qaId } = req.params;
    await QAModel.deleteQA(qaId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.incrementViewCount = async (req, res) => {
  try {
    const { qaId } = req.params;
    await QAModel.incrementViewCount(qaId);
    res.status(200).json({ message: "View count incremented successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.likeQA = async (req, res) => {
  try {
    const { qaId } = req.params;
    await QAModel.likeQA(qaId);
    res.status(200).json({ message: "Like added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.dislikeQA = async (req, res) => {
  try {
    const { qaId } = req.params;
    await QAModel.dislikeQA(qaId);
    res.status(200).json({ message: "Dislike added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateQAOrder = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { qaOrder } = req.body;
    await QAModel.updateQAOrder(topicId, qaOrder);
    res.status(200).json({ message: "QA order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchQAs = async (req, res) => {
  try {
    const { query } = req.params;
    const searchResults = await QAModel.searchQAs(query);
    res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPopularQAs = async (req, res) => {
  try {
    const popularQAs = await QAModel.getPopularQAs();
    res.status(200).json(popularQAs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Additional controller functions can be added based on your specific requirements
