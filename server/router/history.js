const express = require('express');
const historyController = require('../controller/history');
const { asyncErrorCatcher } = require('../middleware/asyncErrorCatcher');

const historyRouter = express.Router();

historyRouter.get(
  '/',
  asyncErrorCatcher(historyController.getAllHistoryOfMonth),
);
historyRouter.get(
  '/perCategory',
  asyncErrorCatcher(historyController.getAmountGroupByCategory),
);
historyRouter.post('/', asyncErrorCatcher(historyController.postHistory));
historyRouter.put('/', asyncErrorCatcher(historyController.putHistory));

module.exports = { historyRouter };
