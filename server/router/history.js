const express = require('express');
const controller = require('../controller/history');
const { asyncErrorCatcher } = require('../middleware/asyncErrorCatcher');

const historyRouter = express.Router();

historyRouter.get('/', asyncErrorCatcher(controller.getAllHistoryOfMonth));
historyRouter.get(
  '/perCategory',
  asyncErrorCatcher(controller.getAmountGroupByCategory),
);
historyRouter.post('/', asyncErrorCatcher(controller.postHistory));
historyRouter.put('/', asyncErrorCatcher(controller.putHistory));

module.exports = { historyRouter };
