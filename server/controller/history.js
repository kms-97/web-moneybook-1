const historyService = require('../service/history');
const { groupByDate } = require('../util/history');
const { parameterValidator } = require('../util/parameterValidator');

async function getAllHistoryOfMonth(req, res, next) {
  const { year, month } = req.query;

  parameterValidator([
    [Number(year), 'number'],
    [Number(month), 'number'],
  ]);

  const data = await historyService.getAllHistoryOfMonth({ year, month });
  res.status(200).json(groupByDate(data));
}

async function getAmountGroupByCategory(req, res, next) {
  const { year, month, categoryId } = req.query;

  parameterValidator([
    [Number(year), 'number'],
    [Number(month), 'number'],
    [Number(categoryId), 'number'],
  ]);

  const data = await historyService.getAmountGroupByCategory({
    year,
    month,
    categoryId,
  });

  res.status(200).json(data);
}

async function postHistory(req, res, next) {
  const {
    currentYear,
    currentMonth,
    year,
    month,
    date,
    categoryId,
    content,
    paymentId,
    amount,
  } = req.body;

  parameterValidator([
    [currentYear, 'number'],
    [currentMonth, 'number'],
    [year, 'number'],
    [month, 'number'],
    [date, 'number'],
    [categoryId, 'number'],
    [content, 'string'],
    [paymentId, 'number'],
    [amount, 'number'],
  ]);

  const data = await historyService.postHistory({
    currentYear,
    currentMonth,
    year,
    month,
    date,
    categoryId,
    content,
    paymentId,
    amount,
  });
  res.status(200).json(groupByDate(data));
}

async function putHistory(req, res, next) {
  const {
    currentYear,
    currentMonth,
    id,
    year,
    month,
    date,
    categoryId,
    content,
    paymentId,
    amount,
  } = req.body;

  parameterValidator([
    [currentYear, 'number'],
    [currentMonth, 'number'],
    [id, 'number'],
    [year, 'number'],
    [month, 'number'],
    [date, 'number'],
    [categoryId, 'number'],
    [content, 'string'],
    [paymentId, 'number'],
    [amount, 'number'],
  ]);

  const data = await historyService.putHistory({
    currentYear,
    currentMonth,
    id,
    year,
    month,
    date,
    categoryId,
    content,
    paymentId,
    amount,
  });
  res.status(200).json(groupByDate(data));
}

module.exports = {
  getAllHistoryOfMonth,
  getAmountGroupByCategory,
  postHistory,
  putHistory,
};
