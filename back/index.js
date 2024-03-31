import express from 'express'
import cors from 'cors'
import indexRouter from './routes/index.routes.js'
import { PORT, fullDomain } from './config/config.js'
import connection from './db/mongo.db.js'

const app = express()

console.clear()

connection();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());


app.use("/API/v1/", indexRouter)


app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send("<h1>Proyecto FullStack</h1>")
})



app.listen(PORT, () => {

    console.log(`Running in ${fullDomain}`)
}) 