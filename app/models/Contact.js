// ===== Contact
// import all modules
const Database = require('../core/Database')

class Contact extends Database {
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

  getContactCount (data) {
    return new Promise((resolve, reject) => {
      this.db.query(`
        SELECT COUNT(*) AS count FROM ${this.table} as c
        INNER JOIN users u ON u.id = c.user_id
        INNER JOIN users f ON f.id = c.friend_id 
        WHERE (u.id = ${data.id}) AND 
        (c.contact_name LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%' OR 
        f.full_name LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%' OR
        u.full_name LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%' OR
        f.email LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%' OR
        u.email LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
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
        SELECT c.id, c.contact_name, 
        f.status, f.picture AS picture 
        FROM ${this.table} as c
        INNER JOIN users u ON u.id = c.user_id
        INNER JOIN users f ON f.id = c.friend_id 
        WHERE (u.id = ${data.id}) AND 
        (c.contact_name LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%' OR 
        f.full_name LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%' OR
        u.full_name LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%' OR
        f.email LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%' OR
        u.email LIKE '%${String(data.keyword).replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')}%')
        ORDER BY c.${data.by} ${data.sort}
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

module.exports = new Contact('contacts')
