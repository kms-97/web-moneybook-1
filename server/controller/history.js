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

module.exports = {
  getAllHistoryOfMonth,
};
