const mysql = require("mysql2/promise");
const {
  host,
  user,
  password,
  database,
} = require("../../config/database.config");

class UserModel {
  async createUser(username, email, status) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });
    try {
      const [results] = await connection.execute(
        "INSERT INTO Users (username, email, status) VALUES (?, ?, ?)",
        [username, email, status]
      );

      return {
        userId: results.insertId,
        username,
        email,
        status,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to create user");
    } finally {
      await connection.end();
    }
  }

  async getUserById(userId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "SELECT * FROM Users WHERE userId = ?",
        [userId]
      );

      if (results.length === 0) {
        throw new Error("User not found");
      }

      return results[0];
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch user");
    } finally {
      await connection.end();
    }
  }

  async updateUser(userId, username, email, password, status) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "UPDATE Users SET username = ?, email = ?, password = ?, status = ? WHERE userId = ?",
        [username, email, password, status, userId]
      );

      if (results.affectedRows === 0) {
        throw new Error("User not found");
      }

      return {
        userId,
        username,
        email,
        status,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update user");
    } finally {
      await connection.end();
    }
  }

  async deleteUser(userId) {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    try {
      const [results] = await connection.execute(
        "DELETE FROM Users WHERE userId = ?",
        [userId]
      );

      if (results.affectedRows === 0) {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete user");
    } finally {
      await connection.end();
    }
  }
}

module.exports = new UserModel();
