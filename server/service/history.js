const { getConnection } = require('../db/db');
const { getStartAndEndDateString, makeDateString } = require('../util/date');

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

async function postHistory({
  year,
  month,
  date,
  categoryId,
  content,
  paymentId,
  amount,
  isIncome,
}) {
  const createdDate = makeDateString({ year, month, date });
  let connection;

  try {
    connection = await getConnection();
    await connection.beginTransaction();

    const [{ affectedRows }] = await insert(connection, {
      createdDate,
      categoryId,
      content,
      paymentId,
      amount,
      isIncome,
    });
    const [rows] = await findAllOfMonth(connection, { year, month });

    await connection.commit();
    return rows;
  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection?.release();
  }
}

function findAllOfMonth(connection, { year, month }) {
  const { startDate, endDate } = getStartAndEndDateString({ year, month });
  const query = `select * from hist where create_date between ? and ?`;
  return connection.execute(query, [startDate, endDate]);
}

function insert(
  connection,
  { createdDate, categoryId, content, paymentId, amount, isIncome },
) {
  const query = `insert into hist (create_date, category_id, content, payment_id, amount, is_income) values (?, ?, ?, ?, ?, ?)`;
  return connection.execute(query, [
    createdDate,
    categoryId,
    content,
    paymentId,
    amount,
    isIncome,
  ]);
}

module.exports = {
  getAllHistoryOfMonth,
  postHistory,
};
