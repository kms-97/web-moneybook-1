const express = require('express');
const controller = require('../controller/category');

const categoryRouter = express.Router();

categoryRouter.get('/', controller.getAllCategory);

module.exports = { categoryRouter };
