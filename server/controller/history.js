const historyService = require('../service/history');
const { groupByDate } = require('../util/history');

async function getAllHistoryOfMonth(req, res) {
  const { year, month } = req.query;

  try {
    const data = await historyService.getAllHistoryOfMonth({ year, month });
    res.status(200).json(groupByDate(data));
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function getAmountGroupByCategory(req, res) {
  const { startYear, startMonth, endYear, endMonth, categoryId } = req.query;

  try {
    const data = await historyService.getAmountGroupByCategory({
      startYear,
      startMonth,
      endYear,
      endMonth,
      categoryId,
    });
    res.status(200).json(groupByDate(data));
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function postHistory(req, res) {
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
    isIncome,
  } = req.body;

  try {
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
      isIncome,
    });
    res.status(200).json(groupByDate(data));
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function putHistory(req, res) {
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
    isIncome,
  } = req.body;

  try {
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
      isIncome,
    });
    res.status(200).json(groupByDate(data));
  } catch (e) {
    res.status(500).json(e.message);
  }
}

module.exports = {
  getAllHistoryOfMonth,
  getAmountGroupByCategory,
  postHistory,
  putHistory,
};
