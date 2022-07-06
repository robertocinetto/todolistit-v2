const express = require('express')
const app = express()
const PORT = 5001

// import demo data from file
const demoData = require('./api/todos.json')

//set the route to get the todos
app.get('/api/v1/todos', (req, res) => {
  res.send(demoData)
})

//set express to listen on port PORT
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
