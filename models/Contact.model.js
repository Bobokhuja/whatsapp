import { createPool } from 'mysql'
import config from 'config'

class Contact {
  constructor(pool) {
    this.pool = pool
  }

  getContacts(userId) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `SELECT * FROM contact WHERE user="${userId}"`
        connection.query(query, (error, results) => {
          if (error) reject(error)
          resolve(results)
        })
        connection.release()
      })
    })
  }

  getContact(userId, contactId) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `SELECT * FROM contact WHERE user="${userId}" AND contact="${contactId}"`
        connection.query(query, (error, results) => {
          if (error) reject(error)
          resolve(results[0])
        })
        connection.release()
      })
    })
  }

  insert(user, contact) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `INSERT INTO contact (user, contact, date) VALUES ("${user}", "${contact}", "${new Date().toLocaleString('zh')}")`
        connection.query(query, (error, results) => {
          if (error) reject(error)
          resolve(results)
        })
        connection.release()
      })
    })
  }

  delete(user, contact) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `DELETE FROM contact WHERE user="${user}" AND contact="${contact}"`
        connection.query(query, (error, results) => {
          if (error) reject(error)
          resolve(!!results.affectedRows)
        })
        connection.release()
      })
    })
  }
}

const pool = createPool(config.get('db'))
const ContactModel = new Contact(pool)
export default ContactModel