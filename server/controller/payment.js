const service = require('../service/payment');

async function getAllPayment(req, res) {
  try {
    const data = await service.getAllPayment();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function postPayment(req, res) {
  const { content } = req.body;
  try {
    const data = await service.postPayment({ content });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function deletePayment(req, res) {
  const { id } = req.body;
  try {
    const data = await service.deletePayment({ id });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

module.exports = {
  getAllPayment,
  postPayment,
  deletePayment,
};
