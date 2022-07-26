const { getConnection } = require('../db/db');
const CustomError = require('../error/CustomError');
const { ERROR_INFO } = require('../util/constant');

async function getAllCategory() {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await findAll(connection);

    return rows;
  } catch (e) {
    throw new CustomError({ ...ERROR_INFO.APPLICATION_ERROR });
  } finally {
    connection?.release();
  }
}

function findAll(connection) {
  const query = 'select * from category';
  return connection.execute(query);
}

module.exports = {
  getAllCategory,
};
