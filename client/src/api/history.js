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

export const getHistoryPerCategory = async (
  year,
  month,
  endYear,
  endMonth,
  categoryId,
) => {
  const response = await request({
    method: 'get',
    requestURL: `${URL_PRIFIX}?year=${year}&month=${month}&endYear=${endYear}&endMonth=${endMonth}&categoryId=${categoryId}`,
  });

  if (response instanceof Error) {
    console.log(response.message);
  }

  return response;
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
