const ERROR_INFO = {
  APPLICATION_ERROR: {
    statusCode: 500,
    errorCode: 'E0001',
    name: 'Application Error',
    message: '서버 또는 데이터베이스 오류입니다.',
  },
  MISSING_PARAMETER: {
    statusCode: 400,
    errorCode: 'E0002',
    name: 'Missing Required Parameter',
    message: '필수 파라미터가 전달되지 않았습니다.',
  },
  INVALID_PARAMETER: {
    statusCode: 400,
    errorCode: 'E0003',
    name: 'Invalid Parameter',
    message: '전달된 파라미터가 적절하지 않습니다.',
  },
  NOT_FOUND: {
    statusCode: 404,
    errorCode: 'E0004',
    name: 'Not Found',
    message: '요청에 대한 자료를 찾을 수 없습니다.',
  },
  BAD_REQUEST: {
    statusCode: 403,
    errorCode: 'E0005',
    name: 'Bad Request',
    message: '잘못된 요청입니다.',
  },
};

module.exports = {
  ERROR_INFO,
};
