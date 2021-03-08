require('dotenv').config();
const path = require('path');
const express = require('express');
const router = require("./src/routes");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client', 'build')));

const dbPath = env === "production" ? process.env.DB_PATH :  (env==="development" ? process.env.DB_PATH_DEV : process.env.DB_PATH_TEST);

mongoose.connect(process.env.DB_PATH, { useNewUrlParser: true })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

//the request having /images/ will be sent to the routes module.  
app.use('/images', router);

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at port ${port}`);
});

module.exports = app;