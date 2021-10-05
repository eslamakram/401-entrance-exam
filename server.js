const express = require('express');

const cors = require('cors');

const axios = require('axios');

require('dotenv').config();

const app= express();

app.use(cors());

app.use(express.json());

const mongoose = require('mongoose');

const PORT= process.env.PORT;
const MONGO_SERVER= process.env.MONGO_SERVER;
const {seedWatch } = require('./models/Watch.Model');
const {getApiController,addTOFavController,getFavController,deleteFavController,updateFavController }= require('./controllers/watch.Controller')


mongoose.connect(`${MONGO_SERVER}`,{ useNewUrlParser: true , useUnifiedTopology:true });


app.get('/',(req,res)=>{
    res.send('server Working!')
})

// app.get('/seed-data',(req,res)=>{
//     seedWatch();
//     res.json({'message':'seed created'})

// })

app.get('/getApi', getApiController);
app.get('/getFav',getFavController);
app.post('/addtoFav', addTOFavController);
app.delete('/deleteFav/:id',deleteFavController);
app.put('/updateFav/:id', updateFavController);



app.listen(PORT, ()=>{
    console.log(`listening on port${PORT}`)
})