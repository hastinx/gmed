const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const db = require('./config/db.js')
const route = require('./router')
dotenv.config()

let port = process.env.PORT || 3000;
const app = express()

app.use(cors())
app.use(express.json())


for (routes of route.routes) {
    app.use('/api', routes)
}


app.listen(port, () => {
    console.log("------------------API RUNNING--------------------")
    console.log(`------------------PORT ${port}--------------------`)
    console.log("------------------###########--------------------")
})