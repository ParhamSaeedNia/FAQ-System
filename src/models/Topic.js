const mysql = require("mysql2/promise");
const {
  host,
  user,
  password,
  database,
} = require("../../config/database.config");

class TopicModel {
  async createTopic(sectionId, name, description, isDraft, sortOrder) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "INSERT INTO Topics (sectionId, name, description, isDraft,sortOrder) VALUES (?, ?, ?, ?, ?)",
        [sectionId, name, description, isDraft, sortOrder]
      );

      return {
        topicId: results.insertId,
        sectionId,
        name,
        description,
        isDraft,
        sortOrder,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to create topic");
    } finally {
      await connection.end();
    }
  }

  async getAllTopics() {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute("SELECT * FROM Topics");
      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch Topics");
    } finally {
      await connection.end();
    }
  }

  async getTopicsBySection(sectionId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "SELECT * FROM Topics WHERE sectionId = ?",
        [sectionId]
      );
      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch topics");
    } finally {
      await connection.end();
    }
  }

  async getTopicById(topicId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "SELECT * FROM Topics WHERE topicId = ?",
        [topicId]
      );

      if (results.length === 0) {
        throw new Error("Topic not found");
      }

      return results[0];
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch topic");
    } finally {
      await connection.end();
    }
  }

  async updateTopic(topicId, name, description, isDraft, sortOrder) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE Topics SET name = ?, description = ?, isDraft = ?, sortOrder = ? WHERE topicId = ?",
        [name, description, isDraft, sortOrder, topicId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Topic not found");
      }

      return {
        topicId,
        name,
        description,
        isDraft,
        sortOrder,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update topic");
    } finally {
      await connection.end();
    }
  }

  async deleteTopic(topicId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "DELETE FROM Topics WHERE topicId = ?",
        [topicId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Topic not found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete topic");
    } finally {
      await connection.end();
    }
  }

  async updateTopicOrder(sectionId, topicOrder) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE Topics SET sortOrder = ? WHERE sectionId = ?",
        [topicOrder, sectionId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Section or topics not found");
      }

      return { message: "Topic order updated successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update topic order");
    } finally {
      await connection.end();
    }
  }
}

module.exports = new TopicModel();
