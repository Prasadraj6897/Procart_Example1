import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from "mongoose"
import UserRouter from './Routers/Users.js'
import AdminRouter from './Routers/Admin/adminuser.js'
import CategoryRouter from './Routers/Category/Category.js'
import ProductRouter from './Routers/Product/Product.js'
import Cartrouter from './Routers/Cart/Cart.js'
import * as path from 'path';

const app = express();

dotenv.config();

//for passing data from client to server we need bodyparser
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));

app.use(cors());
app.options('*', cors());
app.set('port', process.env.PORT || 5000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//to load static image in browser use below link
const __dirname = path.resolve();

app.use('/public', express.static( path.join(path.dirname(__dirname), '/server/uploads')))
//

app.use('/users', UserRouter);
app.use('/admin', AdminRouter);
app.use('/category', CategoryRouter);
app.use('/product', ProductRouter);
app.use('/cart', Cartrouter);




mongoose.connect(process.env.CONNECTION_URL , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true})
    .then(()=>app.listen(process.env.PORT, ()=>console.log(`Server running ${process.env.PORT}`)))
    .catch((err)=>console.log(err))

mongoose.set('useFindAndModify', false)