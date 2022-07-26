const service = require('../service/history');
const { parameterValidator } = require('../util/parameterValidator');

async function getAllHistoryOfMonth(req, res, next) {
  const { year, month } = req.body;

  parameterValidator([
    [year, 'number'],
    [month, 'number'],
  ]);

  const data = await service.getAllHistoryOfMonth({ year, month });
  res.status(200).json(data);
}

async function getAmountGroupByCategory(req, res, next) {
  const { startYear, startMonth, endYear, endMonth, categoryId } = req.body;

  parameterValidator([
    [startYear, 'number'],
    [startMonth, 'number'],
    [endYear, 'number'],
    [endMonth, 'number'],
    [categoryId, 'number'],
  ]);

  const data = await service.getAmountGroupByCategory({
    startYear,
    startMonth,
    endYear,
    endMonth,
    categoryId,
  });
  res.status(200).json(data);
}

async function postHistory(req, res, next) {
  const {
    year,
    month,
    date,
    categoryId,
    content,
    paymentId,
    amount,
    isIncome,
  } = req.body;
  
  parameterValidator([
    [year, 'number'],
    [month, 'number'],
    [date, 'number'],
    [categoryId, 'number'],
    [content, 'string'],
    [paymentId, 'number'],
    [amount, 'number'],
    //[isIncome, 'boolean']
  ]);

  const data = await service.postHistory({
    year,
    month,
    date,
    categoryId,
    content,
    paymentId,
    amount,
    isIncome,
  });
  res.status(200).json(data);
}

async function putHistory(req, res, next) {
  const {
    id,
    year,
    month,
    date,
    categoryId,
    content,
    paymentId,
    amount,
    isIncome,
  } = req.body;

  const data = await service.putHistory({
    id,
    year,
    month,
    date,
    categoryId,
    content,
    paymentId,
    amount,
    isIncome,
  });
  res.status(200).json(data);
}

module.exports = {
  getAllHistoryOfMonth,
  getAmountGroupByCategory,
  postHistory,
  putHistory,
};
