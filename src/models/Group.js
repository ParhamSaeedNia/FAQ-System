const mysql = require("mysql2/promise");
const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = require("../../config/database.config");

class GroupModel {
  async createGroup(name) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "INSERT INTO Groups (name) VALUES (?)",
        [name]
      );
      return { groupId: results.insertId, name };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to create group");
    } finally {
      await connection.end();
    }
  }

  async getAllGroups() {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute("SELECT * FROM Groups");
      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch groups");
    } finally {
      await connection.end();
    }
  }

  async getGroupById(groupId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "SELECT * FROM Groups WHERE groupId = ?",
        [groupId]
      );

      if (results.length === 0) {
        throw new Error("Group not found");
      }

      return results[0];
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch group");
    } finally {
      await connection.end();
    }
  }

  async updateGroup(groupId, name) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE Groups SET name = ? WHERE groupId = ?",
        [name, groupId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Group not found");
      }

      return { groupId, name };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update group");
    } finally {
      await connection.end();
    }
  }

  async deleteGroup(groupId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      databaseE,
    });

    try {
      const [results] = await connection.execute(
        "DELETE FROM Groups WHERE groupId = ?",
        [groupId]
      );

      if (results.affectedRows === 0) {
        throw new Error("Group not found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete group");
    } finally {
      await connection.end();
    }
  }
}

module.exports = new GroupModel();
