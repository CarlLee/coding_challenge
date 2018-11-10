const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer({
    dest: process.env.UPLOAD_PATH || '/tmp/',
    limits: {
        fileSize : 7 * 1024 * 1024,
        files: 20
    }
})
const port = process.env.PORT || 3000

const controller = require('./controller')

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/schedule', upload.array('attachments'), controller)

app.listen(port, () => console.log(`Listening on port ${port}!`))
