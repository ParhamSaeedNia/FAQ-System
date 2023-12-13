const GroupModel = require("../models/Group");

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const newGroup = await GroupModel.createGroup({ name });
    res.status(201).json(newGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await GroupModel.getAllGroups();
    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get group by ID
exports.getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await GroupModel.getGroupById(groupId);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
    } else {
      res.status(200).json(group);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update group by ID
exports.updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;

    const group = await GroupModel.getGroupById(groupId);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
    } else {
      group.name = name;
      await group.save();
      res.status(200).json(group);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete group by ID
exports.deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await GroupModel.getGroupById(groupId);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
    } else {
      await group.destroy();
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
