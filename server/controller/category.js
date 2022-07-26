const categoryService = require('../service/category');

async function getAllCategory(req, res) {
  try {
    const data = await categoryService.getAllCategory();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

module.exports = {
  getAllCategory,
};
