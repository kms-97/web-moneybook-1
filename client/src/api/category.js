import { request } from '../utils/request';

const URL_PRIFIX = '/category';

export const getAllCategory = async () => {
  const response = await request({
    method: 'get',
    requestURL: URL_PRIFIX,
  });

  if (response instanceof Error) {
    console.log(response.message);
  }

  return response;
};
