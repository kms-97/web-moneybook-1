const service = require('../service/payment');

async function getAllPayment(req, res) {
  try {
    const data = await service.getAllPayment();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

module.exports = {
  getAllPayment,
};
