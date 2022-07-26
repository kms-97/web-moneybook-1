const { getConnection } = require('../db/db');

async function getAllCategory() {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await findAll(connection);

    return rows;
  } catch (e) {
    throw e;
  } finally {
    connection?.release();
  }
}

function findAll(connection) {
  const query = 'select id, content, is_income as isIncome from category';
  return connection.execute(query);
}

module.exports = {
  getAllCategory,
};
