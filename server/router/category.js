const express = require('express');
const categoryController = require('../controller/category');
const { asyncErrorCatcher } = require('../middleware/asyncErrorCatcher');

const categoryRouter = express.Router();

categoryRouter.get('/', asyncErrorCatcher(categoryController.getAllCategory));

module.exports = { categoryRouter };
