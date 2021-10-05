'use strict'
const mongoose = require('mongoose');

// "title": "Justice Fashion", 
// "description": "nw analog type stylislog Watch - For Men",
//  "toUSD": "123", 
//  "image_url": "https://rukminim1.flixcart.com/image/800/960/kgv5x\u2026point-of-care-original-imaevxt5p32nw5wj.jpeg?q=50"
class watchFilter{
    constructor(object){
         this.name= object.title,
         this.description= object.description,
         this.toUSD= object.toUSD,
         this.image= object.image_url

    }
}


const watchesSchema = new mongoose.Schema({
    name: String,
    description: String,
    toUSD:String,
    image: String,
    email: String
});

const watchModel= mongoose.model('watchs',watchesSchema);

let seedWatch = ()=>{
    let firstWatch = new watchModel({
        name: "Justice Fashion",
        description: "nw analog type stylislog Watch - For Men",
        toUSD:'123$',
        image: "https://rukminim1.flixcart.com/image/800/960/kgv5x\u2026point-of-care-original-imaevxt5p32nw5wj.jpeg?q=50",
        email: "v.salvatore7.gs@gmail.com"
    });
    firstWatch.save();
}

module.exports ={
watchesSchema,
watchModel,
seedWatch,
watchFilter

}