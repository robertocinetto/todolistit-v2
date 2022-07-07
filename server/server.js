if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001

const path = require('path')

app.use(express.static(path.resolve(__dirname, '../client/build')))

// import routes file and set express to use it
const routes = require('./routes/index')
app.use('/', routes)

const publicPath = path.join(__dirname, '..', 'client/public')
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

//mongoose import and setup
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.error('Connnected to Mongoose'))

//set express to listen on port PORT
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
