const express = require('express')
const app = express()
const PORT = 5001

const routes = require('./routes/index')

app.use('/', routes)

//set express to listen on port PORT
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
