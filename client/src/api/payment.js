import { request } from '../utils/request';

const URL_PRIFIX = '/payment';

export const getAllPayment = async () => {
  const response = await request({
    method: 'get',
    requestURL: URL_PRIFIX,
  });

  if (response instanceof Error) {
    console.log(response.message);
  }

  return response;
};

export const postPayment = async (content) => {
  const response = await request({
    method: 'post',
    requestURL: URL_PRIFIX,
    body: { content },
  });

  if (response instanceof Error) {
    console.log(response.message);
  }

  return response;
};

export const deletePayment = async (id) => {
  const response = await request({
    method: 'delete',
    requestURL: URL_PRIFIX,
    body: { id },
  });

  if (response instanceof Error) {
    console.log(response.message);
  }

  return response;
};
