const path = require('path');

const express = require('express');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at port ${port}`);
});
