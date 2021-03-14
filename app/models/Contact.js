// ===== Contact
// import all modules
const Database = require('../core/Database')

class User extends Database {
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

  getContactCount (data) {
    return new Promise((resolve, reject) => {
      this.db.query(`
        SELECT COUNT(*) AS count FROM ${this.table} as c
        INNER JOIN users u ON u.id = c.user_id
        INNER JOIN users f ON f.id = c.friend_id 
        WHERE (u.id = ${data.id}) AND 
        (c.contact_name LIKE '%${data.keyword}%' OR 
        f.full_name LIKE '%${data.keyword}%' OR
        u.full_name LIKE '%${data.keyword}%' OR
        f.email LIKE '%${data.keyword}%' OR
        u.email LIKE '%${data.keyword}%')
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
        (c.contact_name LIKE '%${data.keyword}%' OR 
        f.full_name LIKE '%${data.keyword}%' OR
        u.full_name LIKE '%${data.keyword}%' OR
        f.email LIKE '%${data.keyword}%' OR
        u.email LIKE '%${data.keyword}%')
        ORDER BY c.contact_name ASC
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

module.exports = new User('contacts')
