const port = process.env.PORT || 8081
const express = require('express')
const path = require('path')
const make_request = require('./script')

const app = express()
app.listen(port, () => {
    console.log('Server is running on', port)
})
const publicDirectoryPath = path.join(__dirname, './public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('', (req, res) => {
    res.sendFile(`${publicDirectoryPath}/index.html`)
})

app.get('/search', async (req, res) => {
    tags = req.query.tags
    page = req.query.page

    if(!tags) {
        res.status(400).send({'error': 'No tags provided'})
    }

    if(!page) {
        page = 0
    }

    make_request(tags, 10, parseInt(page)).then(result => {
        res.status(200).send(result)
    })
})

module.exports = app