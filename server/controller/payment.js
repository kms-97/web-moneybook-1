const service = require('../service/payment');

async function getAllPayment(req, res, next) {
  try {
    const data = await service.getAllPayment();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

async function postPayment(req, res, next) {
  const { content } = req.body;
  try {
    const data = await service.postPayment({ content });
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

async function deletePayment(req, res, next) {
  const { id } = req.body;
  try {
    const data = await service.deletePayment({ id });
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAllPayment,
  postPayment,
  deletePayment,
};
