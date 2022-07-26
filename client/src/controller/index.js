import * as store from '../store';
import { storeKeys } from '../utils/constant';
import {
  getMockCategory,
  getMockHistory,
  getMockPayment,
} from '../utils/generateMockData';

export const subscribeState = ({ key, callback }) => {
  return store.subscribeState({ key, callback });
};

export const getState = ({ key }) => {
  return store.getState({ key });
};

export const setState = ({ key, newState }) => {
  store.setState({ key, newState });
};

/* 년월 관련 */
export const increaseMonth = () => {
  const { month, year } = getState({ key: storeKeys.CURRENT_DATE });

  if (month === 12) {
    setState({
      key: storeKeys.CURRENT_DATE,
      newState: { year: year + 1, month: 1 },
    });
  } else {
    setState({
      key: storeKeys.CURRENT_DATE,
      newState: { year, month: month + 1 },
    });
  }

  updateHistories();
};

export const decreaseMonth = () => {
  const { month, year } = getState({ key: storeKeys.CURRENT_DATE });

  if (month === 1) {
    setState({
      key: storeKeys.CURRENT_DATE,
      newState: { year: year - 1, month: 12 },
    });
  } else {
    setState({
      key: storeKeys.CURRENT_DATE,
      newState: { year, month: month - 1 },
    });
  }

  updateHistories();
};

/* 이력 관련 */
export const updateHistories = async () => {
  const { month, year } = getState({ key: storeKeys.CURRENT_DATE });

  // 서버에서 해당 년 월에 해당하는 최근 6개월의 기록을 받아와 state를 업데이트
  // 현재는 최근 1개월 기록만 예시 데이터로 관리.
  const histories = await getMockHistory();
  setState({ key: storeKeys.CURRENT_HISTORY, newState: [...histories] });
};

export const changeSelectedHistory = ({ id = null }) => {
  const { month, year } = getState({ key: storeKeys.CURRENT_DATE });

  if (id) {
    const currentHistory = getState({ key: storeKeys.CURRENT_HISTORY });
    setState({
      key: storeKeys.SELECTED_HISTORY,
      newState: {
        ...currentHistory
          .reduce((p, { datas }) => [...p, ...datas], [])
          .filter((h) => h.id === id)[0],
        year,
        month,
      },
    });
  } else {
    setState({ key: storeKeys.SELECTED_HISTORY, newState: {} });
  }
};

/* 금액 관련 */
export const getCostSumCurrentMonth = () => {
  const currentHistory = getState({ key: storeKeys.CURRENT_HISTORY });
  let costSum = 0;

  for (const { data } of currentHistory) {
    for (const { amount, isIncome } of data) {
      if (!isIncome) costSum += amount;
    }
  }

  return costSum;
};

export const getIncomeSumCurrentMonth = () => {
  const currentHistory = getState({ key: storeKeys.CURRENT_HISTORY });
  let incomeSum = 0;

  for (const { data } of currentHistory) {
    for (const { amount, isIncome } of data) {
      if (isIncome) incomeSum += amount;
    }
  }

  return incomeSum;
};

/* 결제 방법 관련 */
export const updatePayment = async () => {
  const payment = await getMockPayment();
  setState({ key: storeKeys.PAYMENT, newState: payment });
};

// 결제 수단 추가
export const createPayment = (payment, callback) => {
  if (!payment) return;
  // + payment를 추가하는 api를 요청합니다.

  // newPayment의 id인 13은 임시데이터입니다.
  const newPayment = [
    ...getState({ key: storeKeys.PAYMENT }),
    { id: 13, content: payment },
  ];
  setState({ key: storeKeys.PAYMENT, newState: newPayment });
  callback();
};

// 결제 수단 삭제
export const deletePayment = (paymentId, callback) => {
  console.log(getState({ key: storeKeys.PAYMENT }));
  // + payment를 삭제하는 api를 요청합니다.

  // 성공적으로 삭제 시, store를 변경합니다.
  const newPayment = [
    ...getState({ key: storeKeys.PAYMENT }).filter(
      ({ id }) => id !== paymentId,
    ),
  ];

  console.log(paymentId, newPayment);
  setState({ key: storeKeys.PAYMENT, newState: newPayment });
  callback();
};

/* 카테고리 관련 */
export const updateCategory = async () => {
  const category = await getMockCategory();
  setState({ key: storeKeys.CATEGORY, newState: category });
};
