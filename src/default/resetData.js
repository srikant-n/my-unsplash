require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require("mongoose");
const model = require("../model");

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';
const app = express();

const dbPath = env === "production" ? process.env.DB_PATH :  (env==="development" ? process.env.DB_PATH_DEV : process.env.DB_PATH_TEST);

mongoose.connect(dbPath, { useNewUrlParser: true })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

const fs = require('fs');

let rawdata = fs.readFileSync(path.join(__dirname, 'defaultData.json'));
let images = JSON.parse(rawdata);

model.collection.drop();
model.insertMany(images, (err, data) => err ? console.log(err) : console.log("done"));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening at port ${port}`);
});
