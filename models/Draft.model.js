import { createPool } from 'mysql'
import config from 'config'

class Draft {
  constructor(pool) {
    this.pool = pool
  }

  setDraft({userId, receiverId, text}) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)

        connection.query(`SELECT *
                          FROM draft
                          WHERE user = "${userId}"
                            AND receiver = "${receiverId}"`, (err, results) => {
          if (err) reject(err)
          let query

          if (results[0]) {
            query = `UPDATE draft
                     SET text="${text}"
                     WHERE user=${userId}
                       and receiver=${receiverId};`
          } else {
            query = `
                INSERT INTO draft (user, receiver, text)
                VALUES ("${userId}", "${receiverId}", "${text}")`
          }
          connection.query(query, (err, results) => {
            if (err) reject(err)
            resolve(results)
          })
        })


      })
    })
  }

  getDraft(userId, receiverId) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `SELECT *
                       FROM draft
                       WHERE user = "${userId}"
                         AND receiver = "${receiverId}"`
        connection.query(query, (err, results) => {
          if (err) reject(err)
          resolve(results[0])
        })
      })
    })
  }

  getDrafts(userId) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `SELECT *
                       FROM draft
                       WHERE user = "${userId}"`
        connection.query(query, (err, results) => {
          if (err) reject(err)
          resolve(results)
        })
      })
    })
  }

  deleteMessage(senderId, receiverId) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        const query = `DELETE
                       FROM draft
                       WHERE user = "${senderId}"
                         AND receiver = "${receiverId}"`
        connection.query(query, (err, results) => {
          if (err) reject(err)
          resolve(!!results.affectedRows)
        })

      })
    })
  }
}

const pool = createPool(config.get('db'))
const DraftModel = new Draft(pool)
export default DraftModel