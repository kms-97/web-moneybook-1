const express = require('express');

const categoryRouter = express.Router();

categoryRouter.get('/', (req, res) => {
  res.json('get /category');
});

module.exports = { categoryRouter };
