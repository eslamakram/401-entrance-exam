'use strict';
const axios = require('axios');

const { watchFilter, watchModel } = require('../models/Watch.Model')


// app.get('/getFav',getFavController);
// app.post('/addtoFav', addTOFavController);
// app.delete('/deleteFav/:id',deleteFavController);
// app.put('/updateFav/:id', updateFavController);

const getApiController = async (req, res) => {

    let url = 'https://watches-world.herokuapp.com/watches-list/';
    await axios.get(url).then(data => {
        const cleanedData = data.data.map(watch => {
            return new watchFilter(watch)
        })
        res.send(cleanedData)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}


const addTOFavController = async (req, res) => {

    const { name, description, toUSD, image, email } = req.body;
    watchModel.find({}, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        else {
            let newWatch = new watchModel({
                name: name,
                description: description,
                toUSD: toUSD,
                image: image,
                email: email
            });
            newWatch.save();
            res.send(newWatch);
        }

    })

}




const getFavController = async (req, res) => {

    const email  = req.query.email;
    watchModel.find({email:email}, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        else {
             res.send(data);
        }

    })

}


const deleteFavController = async (req, res) => {

    const id  = req.params.id;
    const email = req.query.email;
    watchModel.findOneAndDelete({_id:id}, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        else {
            watchModel.find({email:email},(err,data)=>{
                res.send(data);

            })
        }

    })

}





const updateFavController = async (req, res) => {

    const id  = req.params.id;
    const { name, description, toUSD, image, email } = req.body;
    watchModel.findOneAndUpdate({_id:id},{ name, description, toUSD, image, email }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        else {
            watchModel.find({},(err,data)=>{
                res.send(data);

            })
        }

    })

}



module.exports = {
    getApiController,
    addTOFavController,
    getFavController,
    deleteFavController,
    updateFavController}