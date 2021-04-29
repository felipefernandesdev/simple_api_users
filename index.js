const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const userRoute = require("./routes/Users")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

userRoute(app)



app.get("/",(req, res) =>{
    res.send(`Bem vindos! Site rodando na porta: ${port}`)
})


app.listen(port, ()=>{
    console.log(`API Rodando na ${port}!`)
})