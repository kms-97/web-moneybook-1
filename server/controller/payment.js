const paymentService = require('../service/payment');

async function getAllPayment(req, res) {
  try {
    const data = await paymentService.getAllPayment();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function postPayment(req, res) {
  const { content } = req.body;
  try {
    const data = await paymentService.postPayment({ content });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function deletePayment(req, res) {
  const { id } = req.body;
  try {
    const data = await paymentService.deletePayment({ id });
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
