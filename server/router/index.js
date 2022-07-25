const express = require('express');
const path = require('path');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = { indexRouter };
