const SectionModel = require("../models/Section");

// Create a new section
exports.createSection = async (req, res) => {
  try {
    const { name, description, isDraft } = req.body;
    const newSection = await SectionModel.createSection(
      name,
      description,
      isDraft
    );
    res.status(201).json(newSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all sections
exports.getAllSections = async (req, res) => {
  try {
    const sections = await SectionModel.getAllSections();
    res.status(200).json(sections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get section by ID
exports.getSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const section = await SectionModel.getSectionById(sectionId);

    if (!section) {
      res.status(404).json({ error: "Section not found" });
    } else {
      res.status(200).json(section);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update section by ID
exports.updateSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { name, description, isDraft } = req.body;

    const updatedSection = await SectionModel.updateSection(
      sectionId,
      name,
      description,
      isDraft
    );
    res.status(200).json(updatedSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete section by ID
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    await SectionModel.deleteSection(sectionId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.publishSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    await SectionModel.publishSection(sectionId);
    res.status(200).json({ message: "Section published successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.draftSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    await SectionModel.draftSection(sectionId);
    res.status(200).json({ message: "Section drafted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
