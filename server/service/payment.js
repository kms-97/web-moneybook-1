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

async function postPayment({ content }) {
  let connection;

  try {
    connection = await getConnection();
    await connection.beginTransaction();

    const [{ affectedRows }] = await insert(connection, { content });
    const [rows] = await findAll(connection);

    await connection.commit();
    return rows;
  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection?.release();
  }
}

async function deletePayment({ id }) {
  let connection;

  try {
    connection = await getConnection();
    await connection.beginTransaction();

    const [{ affectedRows }] = await remove(connection, { id });
    const [rows] = await findAll(connection);

    await connection.commit();
    return rows;
  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection?.release();
  }
}

function findAll(connection) {
  const query = 'select * from payment';
  return connection.execute(query);
}

function insert(connection, { content }) {
  const query = `insert into payment (content) values (?)`;
  return connection.execute(query, [content]);
}

function remove(connection, { id }) {
  const query = 'delete from payment where id = ?';
  return connection.execute(query, [id]);
}

module.exports = {
  getAllPayment,
  postPayment,
  deletePayment,
};
