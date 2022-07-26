const express = require('express');
const controller = require('../controller/category');
const { asyncErrorCatcher } = require('../middleware/asyncErrorCatcher');

const categoryRouter = express.Router();

categoryRouter.get('/', asyncErrorCatcher(controller.getAllCategory));

module.exports = { categoryRouter };
