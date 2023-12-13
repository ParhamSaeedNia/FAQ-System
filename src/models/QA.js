const mysql = require("mysql2/promise");
const {
  host,
  user,
  password,
  database,
} = require("../../config/database.config");

class QAModel {
  async createQA(topicId, question, answer, isDraft, sortOrder) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "INSERT INTO QA (topicId, question, answer, isDraft,sortOrder, viewCount, likeCount, dislikeCount) VALUES (?, ?, ?, ?, ?, 0, 0, 0)",
        [topicId, question, answer, isDraft, sortOrder]
      );

      return {
        qaId: results.insertId,
        topicId,
        question,
        answer,
        isDraft,
        sortOrder,
        viewCount: 0,
        likeCount: 0,
        dislikeCount: 0,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to create question and answer");
    } finally {
      await connection.end();
    }
  }

  async getAllQAs() {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute("SELECT * FROM QA");
      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch questions and answers");
    } finally {
      await connection.end();
    }
  }

  async getQAByTopic(topicId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "SELECT * FROM QA WHERE topicId = ?",
        [topicId]
      );
      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch questions and answers");
    } finally {
      await connection.end();
    }
  }

  async getQAById(qaId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "SELECT * FROM QA WHERE qaId = ?",
        [qaId]
      );

      if (results.length === 0) {
        throw new Error("Question and answer not found");
      }

      return results[0];
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch question and answer");
    } finally {
      await connection.end();
    }
  }

  async updateQA(qaId, question, answer, isDraft) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE QA SET question = ?, answer = ?, isDraft = ? WHERE qaId = ?",
        [question, answer, isDraft, qaId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Question and answer not found");
      }

      return {
        qaId,
        question,
        answer,
        isDraft,
        viewCount: 0,
        likesCount: 0,
        dislikesCount: 0,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update question and answer");
    } finally {
      await connection.end();
    }
  }

  async deleteQA(qaId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "DELETE FROM QA WHERE qaId = ?",
        [qaId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Question and answer not found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete question and answer");
    } finally {
      await connection.end();
    }
  }

  async incrementViewCount(qaId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE QA SET viewCount = viewCount + 1 WHERE qaId = ?",
        [qaId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Question and answer not found");
      }

      return { message: "View count incremented successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to increment view count");
    } finally {
      await connection.end();
    }
  }

  async likeQA(qaId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE QA SET likeCount = likeCount + 1 WHERE qaId = ?",
        [qaId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Question and answer not found");
      }

      return { message: "Like added successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to add like");
    } finally {
      await connection.end();
    }
  }

  async dislikeQA(qaId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE QA SET dislikeCount = dislikeCount + 1 WHERE qaId = ?",
        [qaId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Question and answer not found");
      }

      return { message: "Dislike added successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to add dislike");
    } finally {
      await connection.end();
    }
  }

  async updateQAOrder(topicId, qaOrder) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE QA SET sortOrder = ? WHERE topicId = ?",
        [qaOrder, topicId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Topic or Q&A not found");
      }

      return { message: "QA order updated successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update QA order");
    } finally {
      await connection.end();
    }
  }

  async searchQAs(query) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "SELECT * FROM QA WHERE question LIKE ?",
        [`%${query}%`]
      );

      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to search questions and answers");
    } finally {
      await connection.end();
    }
  }

  async getPopularQAs() {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "SELECT * FROM QA WHERE isDraft = false ORDER BY viewCount DESC"
      );

      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch popular questions and answers");
    } finally {
      await connection.end();
    }
  }
}

module.exports = new QAModel();
