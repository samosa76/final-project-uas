// import database
const db = require("../config/database");

// membuat class Employee
class Employee {
  // buat fungsi
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM employees";
      db.query(sql, (sql, result) => {
        resolve(result);
      });
    });
  }

  static async create(Employee) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO employees SET ?";
      db.query(sql, Employee, (err, results) => {
        resolve(results.insertId);
      });
    });


    // promise 2
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE id = ?`;
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  static find(id) {
    // lakukan promise, select by id
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE id = ?`;
      db.query(sql, id, (err, results) => {
        resolve(results[0]);
      });
    });
  }

  static show(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE id = ${id} `;
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  static async update(id, data) {
    // update data
    await new Promise((resolve, reject) => {
      // query untuk update data
      const sql = "UPDATE employees SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // select data by id
    const employee = await this.find(id);
    return employee;
  }

  static async delete(id) {
    // query delete
    return new Promise((resolve, reject) => {
      // query sql
      const sql = "DELETE FROM employees WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  static async search(name){
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE name = ?`;
      db.query(sql, name, (err, results) => {
        resolve(results);
      });
    });
  }

  // static async status(status){
  //   return new Promise((resolve, reject) => {
  //     const sql = `SELECT * FROM employees WHERE status = active`;
  //     db.query(sql, status, (err, results) => {
  //       resolve(results);
  //     });
  //   });
  // }
  static active() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM employees WHERE status = 'active'";
      db.query(sql, (sql, result) => {
        resolve(result);
      });
    });
  }

  static inactive() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM employees WHERE status = 'inactive'";
      db.query(sql, (sql, result) => {
        resolve(result);
      });
    });
  }

}

// export class Employee
module.exports = Employee;
