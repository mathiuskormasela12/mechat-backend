// ===== User
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

module.exports = new User('users')
