const service = require('../service/category');

async function getAllCategory(req, res, next) {
  const data = await service.getAllCategory();
  res.status(200).json(data);
}

module.exports = {
  getAllCategory,
};
