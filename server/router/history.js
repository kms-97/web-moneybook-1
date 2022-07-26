const express = require('express');
const controller = require('../controller/history');

const historyRouter = express.Router();

historyRouter.get('/', controller.getAllHistoryOfMonth);
historyRouter.get('/perCategory', controller.getAmountGroupByCategory);
historyRouter.post('/', controller.postHistory);
historyRouter.put('/', controller.putHistory);

module.exports = { historyRouter };
