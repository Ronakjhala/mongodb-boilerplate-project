
const mongoose = require('mongoose');
const express=require("express");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
mongoose
  .connect('mongodb://localhost:27017/RahiApp')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const user_routes=require("./api/routes/userRoute");
app.use('/api',user_routes);
const cat_route=require("./api/routes/categoryRoutes");
app.use('/api',cat_route);
const tes_route=require("./api/routes/testimonialRoutes");
app.use('/api',tes_route);
const con_route=require("./api/routes/contactRoutes");
app.use('/api',con_route);
const port_route=require("./api/routes/PortfolioRoutes");
app.use('/api',port_route);
  
  app.listen(300,()=>{
    console.log("connected")
  })
  


  
