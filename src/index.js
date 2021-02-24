const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000

// Define pahts for Express config
const publicDirectoryPath = path.join(__dirname,'../public')

// Setup static directory to serve, express.static is a middleware
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.render()
// })

app.listen(port, () => {
    console.log('Server is up and running!')
})
