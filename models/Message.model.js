import { createPool } from 'mysql'
import config from 'config'

class Message {
  constructor(pool) {
    this.pool = pool
  }

  add({message, type, receiver, sender, status, date}) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `
            INSERT INTO message (message, type, sender, receiver, status, date)
            VALUES ("${message}", "${type}", "${sender}", "${receiver}", "${status}", "${date}")`

        connection.query(query, (err, results, fields) => {
          if (err) reject(err)
          resolve(results.insertId)
        })
        connection.release()
      })
    })
  }
  getMessages(senderId, receiverId) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `SELECT * FROM message WHERE sender="${senderId}" AND receiver="${receiverId}" OR sender="${receiverId}" AND receiver="${senderId}"`
        connection.query(query, (err, results) => {
          if (err) reject(err)
          resolve(results)
        })
        connection.release()
      })
    })
  }

  deleteMessage(userId, id) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `DELETE FROM message WHERE id="${id}" AND sender="${userId}"`
        connection.query(query, (err, results) => {
          if (err) reject(err)
          resolve(!!results.affectedRows)
        })
        connection.release()
      })
    })
  }
}

const pool = createPool(config.get('db'))
const MessageModel = new Message(pool)
export default MessageModel