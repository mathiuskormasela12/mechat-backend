// ===== Server
// import all modules
const express = require('express')
const http = require('http')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const path = require('path')
const socketIo = require('socket.io')

// setup dotenv
dotenv.config({ path: './.env' })

// env destructuring
const { PORT } = process.env

const app = express()

// define client
const whiteList = [
  'http://127.0.0.1:3000'
]

// setup socket.io
const server = http.createServer(app)
const io = socketIo(server, {
  cors: whiteList.map(origin => ({ origin }))
})

io.on('connection', () => {
  console.log('a user connected')
})

app.use(require('./app/middlewares/socket')(io))

// setup morgan, helmet & compression
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// setup urlencoded & json
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// setup static file
app.use(express.static(path.join(__dirname, './public')))

// setup cors
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Blocked by cors'))
    }
  }
}

// use cors options
app.use(cors(corsOptions))

// define routes
app.use('/api/v1', require('./app/routes/auth'))
app.use('/api/v1', require('./app/routes/user'))

server.listen(PORT, () => {
  console.log(`Web Service running at http://127.0.0.1:${PORT}`)
})
