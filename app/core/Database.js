// ===== Database
// import mysql
const mysql = require('mysql')

class Database {
  constructor () {
    const {
      DB_HOST,
      DB_USER,
      DB_NAME,
      DB_PASSWORD
    } = process.env
    this.db = mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    })
  }

  connect () {
    this.db.connect(() => {
      console.log('Database has been connected')
    })
  }
}

module.exports = Database
