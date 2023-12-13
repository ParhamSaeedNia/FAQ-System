const mysql = require("mysql2/promise");
const {
  host,
  user,
  password,
  database,
} = require("../../config/database.config");

class SectionModel {
  async createSection(name, description, isDraft) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "INSERT INTO Sections (name, description, isDraft) VALUES (?, ?, ?)",
        [name, description, isDraft]
      );

      return {
        sectionId: results.insertId,
        name,
        description,
        isDraft,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to create section");
    } finally {
      await connection.end();
    }
  }

  async getAllSections() {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute("SELECT * FROM Sections");
      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch sections");
    } finally {
      await connection.end();
    }
  }

  async getSectionById(sectionId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "SELECT * FROM Sections WHERE sectionId = ?",
        [sectionId]
      );

      if (results.length === 0) {
        throw new Error("Section not found");
      }

      return results[0];
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch section");
    } finally {
      await connection.end();
    }
  }

  async updateSection(sectionId, name, description, isDraft) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE Sections SET name = ?, description = ?, isDraft = ? WHERE sectionId = ?",
        [name, description, isDraft, sectionId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Section not found");
      }

      return {
        sectionId,
        name,
        description,
        isDraft,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update section");
    } finally {
      await connection.end();
    }
  }

  async deleteSection(sectionId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "DELETE FROM Sections WHERE sectionId = ?",
        [sectionId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Section not found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete section");
    } finally {
      await connection.end();
    }
  }

  async publishSection(sectionId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE Sections SET isDraft = false WHERE sectionId = ?",
        [sectionId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Section not found");
      }

      return { message: "Section published successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to publish section");
    } finally {
      await connection.end();
    }
  }

  async draftSection(sectionId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE Sections SET isDraft = true WHERE sectionId = ?",
        [sectionId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Section not found");
      }

      return { message: "Section drafted successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to draft section");
    } finally {
      await connection.end();
    }
  }
}

module.exports = new SectionModel();
