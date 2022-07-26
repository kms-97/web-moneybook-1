const service = require('../service/history');

async function getAllHistoryOfMonth(req, res) {
  const { year, month } = req.body;

  try {
    const data = await service.getAllHistoryOfMonth({ year, month });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function getAmountGroupByCategory(req, res) {
  const { startYear, startMonth, endYear, endMonth, categoryId } = req.body;

  try {
    const data = await service.getAmountGroupByCategory({
      startYear,
      startMonth,
      endYear,
      endMonth,
      categoryId,
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function postHistory(req, res) {
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

  try {
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
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function putHistory(req, res) {
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

  try {
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
