const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;
const apodURL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

// your API calls

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(apodURL)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    };
});

app.get('/rover-data/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?sol=10&api_key=${API_KEY}`)
            .then(res => res.json())
        res.send({ data })
    } catch (err) {
        console.log('error:', err);
    }
});