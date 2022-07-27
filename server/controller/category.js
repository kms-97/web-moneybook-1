const categoryService = require('../service/category');

async function getAllCategory(req, res, next) {
  const data = await categoryService.getAllCategory();
  res.status(200).json(data);
}

module.exports = {
  getAllCategory,
};
