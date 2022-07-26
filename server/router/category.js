const express = require('express');
const categoryController = require('../controller/category');

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAllCategory);

module.exports = { categoryRouter };
