const { getConnection } = require('../db/db');

async function getAllPayment() {
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
  const query = 'select * from payment';
  return connection.execute(query);
}

module.exports = {
  getAllPayment,
};
