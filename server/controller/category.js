const service = require('../service/category');

async function getAllCategory(req, res, next) {
  try {
    const data = await service.getAllCategory();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAllCategory,
};
