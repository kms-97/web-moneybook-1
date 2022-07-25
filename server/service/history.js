const { getConnection } = require('../db/db');
const { getStartAndEndDateString } = require('../util/date');

async function getAllHistoryOfMonth({ year, month }) {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await findAllOfMonth(connection, { year, month });

    return rows;
  } catch (e) {
  } finally {
    connection?.release();
  }
}

function findAllOfMonth(connection, { year, month }) {
  const { startDate, endDate } = getStartAndEndDateString({ year, month });
  const query = `select * from hist where create_date between ? and ?`;
  return connection.execute(query, [startDate, endDate]);
}

module.exports = {
  getAllHistoryOfMonth,
};
