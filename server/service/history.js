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

async function putHistory({
  id,
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

    const [{ affectedRows }] = await update(connection, {
      id,
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
  const query = `select id, date_format(create_date, '%d') as date, category_id as categoryId, content, payment_id as paymentId, amount, is_income as isIncome
                from hist where create_date between ? and ? order by date desc, id asc`;
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

function update(
  connection,
  { id, createdDate, categoryId, content, paymentId, amount, isIncome },
) {
  const query = `update hist set create_date = ?, category_id = ?, content = ?, payment_id = ?, amount = ?, is_income = ? where id = ?`;
  return connection.execute(query, [
    createdDate,
    categoryId,
    content,
    paymentId,
    amount,
    isIncome,
    id,
  ]);
}

module.exports = {
  getAllHistoryOfMonth,
  postHistory,
  putHistory,
};
