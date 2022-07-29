const { getConnection } = require('../db/db');
const CustomError = require('../error/CustomError');
const { ERROR_INFO } = require('../util/constant');
const { getStartAndEndDateString, makeDateString } = require('../util/date');

async function getAllHistoryOfMonth({ year, month }) {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await findAllOfMonth(connection, { year, month });

    return rows;
  } catch (e) {
    throw e;
  } finally {
    connection?.release();
  }
}

async function getAmountGroupByCategory({ year, month, categoryId }) {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await findAmontSumByCategory(connection, {
      year,
      month,
      categoryId,
    });

    return rows;
  } catch (e) {
    throw e;
  } finally {
    connection?.release();
  }
}

async function postHistory({
  currentYear,
  currentMonth,
  year,
  month,
  date,
  categoryId,
  content,
  paymentId,
  amount,
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
    });
    if (affectedRows === 0) new CustomError(ERROR_INFO.APPLICATION_ERROR);

    const [rows] = await findAllOfMonth(connection, {
      year: currentYear,
      month: currentMonth,
    });

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
  currentYear,
  currentMonth,
  id,
  year,
  month,
  date,
  categoryId,
  content,
  paymentId,
  amount,
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
    });
    if (affectedRows === 0) throw new CustomError(ERROR_INFO.NOT_FOUND);

    const [rows] = await findAllOfMonth(connection, {
      year: currentYear,
      month: currentMonth,
    });

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
  const query = `select id, cast(date_format(create_date, '%d') as signed) as date, category_id as categoryId, content, payment_id as paymentId, amount, is_income as isIncome
                from hist where create_date between ? and ? order by date desc, id asc`;
  return connection.execute(query, [startDate, endDate]);
}

function insert(
  connection,
  { createdDate, categoryId, content, paymentId, amount },
) {
  const query = `insert into hist (create_date, category_id, content, payment_id, amount, is_income) values (?, ?, ?, ?, ?, (
    select is_income from category where id = ?
  ))`;
  return connection.execute(query, [
    createdDate,
    categoryId,
    content,
    paymentId,
    amount,
    categoryId,
  ]);
}

function update(
  connection,
  { id, createdDate, categoryId, content, paymentId, amount },
) {
  const query = `update hist set create_date = ?, category_id = ?, content = ?, payment_id = ?, amount = ?, is_income = (
    select is_income from category where id = ?
  ) where id = ?`;
  return connection.execute(query, [
    createdDate,
    categoryId,
    content,
    paymentId,
    amount,
    categoryId,
    id,
  ]);
}

function findAmontSumByCategory(connection, { year, month, categoryId }) {
  const { startDate, endDate } = getStartAndEndDateString({
    year,
    month,
  });
  const query = `select ifnull(sum(amount), 0) as amount
  from hist
  where create_date between ? and ? and category_id = ?;`;
  return connection.execute(query, [startDate, endDate, categoryId]);
}

module.exports = {
  getAllHistoryOfMonth,
  getAmountGroupByCategory,
  postHistory,
  putHistory,
};
