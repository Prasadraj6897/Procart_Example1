import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();

dotenv.config();

//for passing data from client to server we need bodyparser
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));

app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Hello from server'
    })
})

app.post('/data',(req,res, next)=>{
    res.status(200).json({
        message:req.body
    })
})

app.listen(process.env.PORT, () =>{
    console.log(`Server running on Port no ${process.env.PORT}`)
})