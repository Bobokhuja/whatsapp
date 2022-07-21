import { createPool } from 'mysql'
import config from 'config'

class User {
  constructor(pool) {
    this.pool = pool
  }

  getUser(fields) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const fieldsStr = Object.keys(fields).map(key => `${key}="${fields[key]}"`).join(' AND ')
        const query = `SELECT * FROM user WHERE ${fieldsStr}`
        connection.query(query, (error, results) => {
          if (error) reject(error)
          resolve(results[0])
        })
      })
    })
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `DELETE FROM user WHERE id="${id}"`
        connection.query(query, (error, results) => {
          if (error) reject(error)
          resolve(results)
        })
      })
    })
  }

  insert({name, username, password}) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `INSERT INTO user (name, username, password) VALUES ("${name}", "${username}", "${password}")`
        connection.query(query, (error, results) => {
          if (error) reject(error)
          resolve(results)
        })
      })
    })
  }

  changeStatus(id, status) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `UPDATE user SET status="${status}" WHERE id="${id}"`
        connection.query(query, (error, results) => {
          if (error) reject(error)
          resolve(results)
        })
      })
    })
  }
}

const pool = createPool(config.get('db'))
const UserModel = new User(pool)
export default UserModel