const express = require('express');
const logger = require('morgan');
const path = require('path');
require('dotenv').config();

const { indexRouter } = require('./router/index');
const { historyRouter } = require('./router/history');
const { paymentRouter } = require('./router/payment');
const { categoryRouter } = require('./router/category');

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/history', historyRouter);
app.use('/payment', paymentRouter);
app.use('/category', categoryRouter);
app.use('/*', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
