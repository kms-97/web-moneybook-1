const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', () => require('./router/index'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
