const express = require('express')
const router = express.Router()

// import demo data from file
const demoData = require('../api/todos.json')

//set the route to get the todos
router.get('/api/v1/todos', (req, res) => {
  res.send(demoData)
})

module.exports = router
