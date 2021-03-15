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
        `${item} = '${String(Object.values(data)[index]).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}'`).join(` ${operator} `)}`,
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
        AND (m.message LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%') 
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
        AND (m.message LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%') 
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

  getChatList (data) {
    return new Promise((resolve, reject) => {
      this.db.query(`
        SELECT c.user_id, c.friend_id, c.contact_name, u.picture, m.createdAt AS time
        FROM messages m 
        INNER JOIN contacts c ON c.friend_id = m.friend_id
        INNER JOIN users u ON u.id = m.friend_id
        WHERE m.user_id = ${data.id} AND
        c.contact_name LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%'
        GROUP BY m.user_id, m.friend_id
        ORDER BY m.createdAt ASC
        LIMIT ${data.offset}, ${data.limit}
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

  getChatListCount (data) {
    return new Promise((resolve, reject) => {
      this.db.query(`
        SELECT COUNT(*) AS count
        FROM messages m 
        INNER JOIN contacts c ON c.friend_id = m.friend_id
        INNER JOIN users u ON u.id = m.friend_id
        WHERE m.user_id = ${data.id} AND
        c.contact_name LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%'
        GROUP BY m.user_id, m.friend_id
      `,
      (err, results) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(results.length)
        }
      })
    })
  }

  getLatestChat () {
    return new Promise((resolve, reject) => {
      this.db.query(`
        SELECT id, user_id, friend_id, message
        FROM ${this.table} 
        ORDER BY createdAt DESC;
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
        VALUES (${Object.values(data).map(item => `'${String(item).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}'`).join(',')})
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
          `${item} = '${String(Object.values(data)[index]).replace(/\\/g, '\\\\')
          .replace(/\$/g, '\\$')
          .replace(/'/g, "\\'")
          .replace(/"/g, '\\"')}'`)
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
