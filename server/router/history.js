const express = require('express');
const historyController = require('../controller/history');

const historyRouter = express.Router();

historyRouter.get('/', historyController.getAllHistoryOfMonth);
historyRouter.get('/perCategory', historyController.getAmountGroupByCategory);
historyRouter.post('/', historyController.postHistory);
historyRouter.put('/', historyController.putHistory);

module.exports = { historyRouter };
