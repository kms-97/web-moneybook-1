import { request } from '../utils/request';

const URL_PRIFIX = '/history';

export const getAllHistory = async (year, month) => {
  const response = await request({
    method: 'get',
    requestURL: `${URL_PRIFIX}?year=${year}&month=${month}`,
  });

  if (response instanceof Error) {
    console.log(response.message);
  }

  return response;
};

export const getAmountSumPerCategory = async (year, month, categoryId) => {
  const response = await request({
    method: 'get',
    requestURL: `${URL_PRIFIX}/perCategory?year=${year}&month=${month}&categoryId=${categoryId}`,
  });

  if (response instanceof Error) {
    console.log(response.message);
  }

  return { year, month, amount: Number(response[0].amount) };
};

export const postHistory = async (history) => {
  const response = await request({
    method: 'post',
    requestURL: URL_PRIFIX,
    body: history,
  });

  if (response instanceof Error) {
    console.log(response.message);
  }

  return response;
};

export const putHistory = async (history) => {
  const response = await request({
    method: 'put',
    requestURL: URL_PRIFIX,
    body: history,
  });

  if (response instanceof Error) {
    console.log(response.message);
  }

  return response;
};
