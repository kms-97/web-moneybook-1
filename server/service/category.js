const { getConnection } = require('../db/db');

async function getAllCategory() {
  const query = 'select * from category';
  let connection;

  try {
    connection = await getConnection();
    const [rows] = connection.execute(query);
    return rows;
  } catch (e) {
    throw e;
  } finally {
    connection?.release();
  }
}

module.exports = {
  getAllCategory,
};
