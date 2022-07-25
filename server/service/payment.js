const { getConnection } = require('../db/db');

async function getAllPayment() {
  const query = 'select * from Payment';
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.execute(query);

    return rows;
  } catch (e) {
    throw e;
  } finally {
    connection?.release();
  }
}

module.exports = {
  getAllPayment,
};
