const service = require('../service/payment');

async function getAllPayment(req, res, next) {
  const data = await service.getAllPayment();
  res.status(200).json(data);
}

async function postPayment(req, res, next) {
  const { content } = req.body;

  const data = await service.postPayment({ content });
  res.status(200).json(data);
}

async function deletePayment(req, res, next) {
  const { id } = req.body;

  const data = await service.deletePayment({ id });
  res.status(200).json(data);
}

module.exports = {
  getAllPayment,
  postPayment,
  deletePayment,
};
