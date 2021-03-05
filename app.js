const path = require('path');
const express = require('express');
const router = require("./src/routes");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'client', 'build')));

// app.get("/", (req, res) => {
//   res.sendFile("./client/build/index.html");
// });

//the request having /user/ will be send to the userRoutes module.  
//in that the rquest will be directed to the specific route.   
app.use('/images', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at port ${port}`);
});
