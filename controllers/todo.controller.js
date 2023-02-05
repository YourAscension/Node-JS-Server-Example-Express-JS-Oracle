import OracleDB from "oracledb";
import { pool } from "../dbconfig.js";

class TodoController {
  async createTodo(req, resp) {
    const { todo, is_completed } = req.body;
    let connection;
    try {
      connection = await pool.getConnection();

      await connection.execute(`insert into todos (todo, is_completed) values(:1, :2)`, [todo, is_completed]);
      await connection.commit();
      resp.sendStatus(201);
    } catch (e) {
      resp.json(e.message);
    } finally {
      await connection.close();
    }
  }

  /**
    Ограничения количества строк с помощью maxRows
    const result = await connection.execute(`select * from todos`, [], { maxRows: 2 });
   */
  async getTodos(req, resp) {
    let connection;
    try {
      connection = await pool.getConnection();
      const result = await connection.execute(`select * from todos`);
      resp.json(result.rows);
    } catch (e) {
      resp.json(e.message);
    } finally {
      await connection.close();
    }
  }
  async getOneTodo(req, resp) {
    const id = req.params.id;
    let connection;
    try {
      connection = await pool.getConnection();
      const result = await connection.execute(`select * from todos where dbid=:1`, [id], {
        outFormat: OracleDB.OUT_FORMAT_OBJECT,
      });
      !!result.rows.length ? resp.json(result.rows) : resp.sendStatus(404);
    } catch (e) {
      resp.json(e.message);
    } finally {
      await connection.close();
    }
  }
  async updateTodo(req, resp) {
    const { id, todo, is_completed } = req.body;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(`update todos set todo=:1, is_completed=:2 where dbid=:3`, [todo, is_completed, id]);
      await connection.commit();
      resp.sendStatus(200);
    } catch (error) {
      resp.json(e.message);
    } finally {
      await connection.close();
    }
  }
  async deleteTodo(req, resp) {
    const id = req.params.id;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.queryStream(`delete from todos where dbid=:1`, [id]);
      await connection.commit();
      resp.sendStatus(200);
    } catch (error) {
      resp.json(error.message);
    } finally {
      await connection.close();
    }
  }
}

export const todoController = new TodoController();
