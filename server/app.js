const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { indexRouter } = require('./router/index');
const { historyRouter } = require('./router/history');
const { paymentRouter } = require('./router/payment');
const { categoryRouter } = require('./router/category');
const { generalErrorHandler } = require('./middleware/generalErrorHandler');
const { customErrorHandler } = require('./middleware/customErrorHandler');
const { sqlErrorHandler } = require('./middleware/sqlErrorHandler');

const app = express();
const port = 3000;

app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/history', historyRouter);
app.use('/payment', paymentRouter);
app.use('/category', categoryRouter);
app.use('/*', indexRouter);

app.use(customErrorHandler);
app.use(sqlErrorHandler);
app.use(generalErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
