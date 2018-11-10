const express = require('express')
const app = express()
const port = 3000

const controller = require('controller')

app.get('/schedule', controller)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
