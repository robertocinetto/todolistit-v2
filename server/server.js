const express = require('express')
const app = express()
const PORT = 5001

app.get('/', (req, res) => {
  res.send('Server app and running')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
