const paymentService = require('../service/payment');
const { parameterValidator } = require('../util/parameterValidator');

async function getAllPayment(req, res, next) {
  const data = await paymentService.getAllPayment();
  res.status(200).json(data);
}

async function postPayment(req, res, next) {
  const { content } = req.body;
  
  parameterValidator([[content, 'string']]);

  const data = await paymentService.postPayment({ content });
  res.status(200).json(data);
}

async function deletePayment(req, res, next) {
  const { id } = req.body;
  
  parameterValidator([[id, 'number']]);

  const data = await paymentService.deletePayment({ id });
  res.status(200).json(data);
}

module.exports = {
  getAllPayment,
  postPayment,
  deletePayment,
};
