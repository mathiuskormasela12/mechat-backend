// ===== Contact
// import all modules
const Database = require('../core/Database')

class Chat extends Database {
  constructor (table) {
    super()
    this.table = table
  }

  findByCondition (data, operator) {
    return new Promise((resolve, reject) => {
      this.db.query(`
        SELECT * FROM ${this.table} 
        WHERE ${Object.keys(data).map((item, index) =>
        `${item} = '${Object.values(data)[index]}'`).join(` ${operator} `)}`,
      (err, results) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(results)
        }
      })
    })
  }

  getChatCount (data) {
    return new Promise((resolve, reject) => {
      this.db.query(`
        SELECT COUNT(m.message) AS count 
        FROM messages m 
        INNER JOIN users u ON m.user_id = u.id 
        INNER JOIN users f ON m.friend_id = f.id 
        WHERE (m.user_id = ${data.id} AND m.friend_id = ${data.friendId}) 
        OR (m.user_id = ${data.friendId} AND m.friend_id = ${data.id})
        AND (m.message LIKE '%${data.keyword}%') 
      `,
      (err, results) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(results[0].count)
        }
      })
    })
  }

  findAll (data) {
    return new Promise((resolve, reject) => {
      this.db.query(`
        SELECT m.id, m.user_id, m.friend_id, m.message 
        FROM messages m 
        INNER JOIN users u ON m.user_id = u.id 
        INNER JOIN users f ON m.friend_id = f.id 
        WHERE ((m.user_id = ${data.id} AND m.friend_id = ${data.friendId}) 
        OR (m.user_id = ${data.friendId} AND m.friend_id = ${data.id}))
        AND (m.message LIKE '%${data.keyword}%') 
        ORDER BY m.createdAt DESC
        LIMIT ${data.offset}, ${data.limit};
      `,
      (err, results) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(results)
        }
      })
    })
  }

  create (data) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
        INSERT INTO ${this.table}(${Object.keys(data).map(item => `${item}`)}) 
        VALUES (${Object.values(data).map(item => `'${item}'`).join(',')})
        `,
        (err, results) => {
          if (err) {
            return reject(err)
          } else {
            return resolve(results)
          }
        }
      )
    })
  }

  update (data, id) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
          UPDATE ${this.table} 
          SET ${Object.keys(data).map((item, index) =>
          `${item} = '${Object.values(data)[index]}'`)
          .join()} WHERE id = ?`,
        id,
        (err, results) => {
          if (err) {
            return reject(err)
          } else {
            return resolve(results)
          }
        }
      )
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.db.query(`DELETE FROM ${this.table} WHERE id = ?`, id, (err, results) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(results)
        }
      })
    })
  }
}

module.exports = new Chat('messages')
