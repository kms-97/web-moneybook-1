const express = require('express');

const indexRouter = express.Router();

indexRouter.get('/', 'index.html');

module.exports = indexRouter;
