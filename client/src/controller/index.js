import {
  getAllHistory as getAllHistoryAPI,
  getAmountSumPerCategory,
  postHistory as postHistoryAPI,
  putHistory as putHistoryAPI,
} from '../api/history';
import { getAllCategory as getAllCategoryAPI } from '../api/category';
import {
  getAllPayment as getAllPaymentAPI,
  postPayment as postPaymentAPI,
  deletePayment as deletePaymentAPI,
} from '../api/payment';
import * as store from '../store';
import { storeKeys } from '../utils/constant';

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
  const response = await getAllHistoryAPI(year, month);
  const histories = response;
  setState({ key: storeKeys.CURRENT_HISTORY, newState: [...histories] });
};

export const getFilteredHistories = () => {
  const history = getState({ key: storeKeys.CURRENT_HISTORY });
  const isCheckedFilter = getState({ key: storeKeys.ISCHECKED_FILTER });

  if (history.length === 0) return [];

  const filteredHistory = history
    .map(({ date, data }) => ({
      date,
      data: [
        ...data.filter(({ isIncome }) => {
          if (isCheckedFilter.income && isIncome === 1) return true;
          if (isCheckedFilter.cost && isIncome === 0) return true;
          return false;
        }),
      ],
    }))
    .filter(({ data }) => data.length);

  return filteredHistory;
};

export const postHistory = async (history, callback) => {
  const response = await postHistoryAPI(history);

  if (response instanceof Error) {
    console.log(error);
    return;
  }
  const histories = response;
  setState({ key: storeKeys.CURRENT_HISTORY, newState: [...histories] });
  callback();
};

export const putHistory = async (history, callback) => {
  const response = await putHistoryAPI(history);

  if (response instanceof Error) {
    console.log(error);
    return;
  }

  const histories = response;
  setState({ key: storeKeys.CURRENT_HISTORY, newState: [...histories] });
  callback();
};

export const changeSelectedHistory = ({ id = null }) => {
  const { month, year } = getState({ key: storeKeys.CURRENT_DATE });

  if (id) {
    const currentHistory = getState({ key: storeKeys.CURRENT_HISTORY });
    setState({
      key: storeKeys.SELECTED_HISTORY,
      newState: {
        ...currentHistory
          .reduce((p, { data }) => [...p, ...data], [])
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
  const history = getState({ key: storeKeys.CURRENT_HISTORY });

  return history.reduce(
    (p, { data }) =>
      p +
      data.reduce(
        (p, { isIncome, amount }) => (!isIncome ? p + parseInt(amount) : p),
        0,
      ),
    0,
  );
};

export const getIncomeSumCurrentMonth = () => {
  const history = getState({ key: storeKeys.CURRENT_HISTORY });

  return history.reduce(
    (p, { data }) =>
      p +
      data.reduce(
        (p, { isIncome, amount }) => (isIncome ? p + parseInt(amount) : p),
        0,
      ),
    0,
  );
};

export const getIncomeSum = (data) => {
  return data.reduce(
    (p, { amount, isIncome }) => (isIncome ? p + parseInt(amount) : p),
    0,
  );
};

export const getCostSum = (data) => {
  return data.reduce(
    (p, { amount, isIncome }) => (!isIncome ? p + parseInt(amount) : p),
    0,
  );
};

export const getPaymentLength = () => {
  const history = getState({ key: storeKeys.CURRENT_HISTORY });
  const filter = getState({ key: storeKeys.ISCHECKED_FILTER });
  return history.reduce(
    (p, { data }) =>
      p +
      data.filter(({ isIncome }) => {
        if (filter.income && isIncome === 1) return true;
        if (filter.cost && isIncome === 0) return true;
        return false;
      }).length,
    0,
  );
};

export const getIncomeAndCostSumOfDate = (date) => {
  const history = getState({ key: storeKeys.CURRENT_HISTORY });

  let income = 0;
  let cost = 0;

  const historyOfDate =
    history.filter(({ date: d }) => d === date)[0]?.data ?? [];

  historyOfDate.forEach(({ isIncome, amount }) => {
    if (isIncome) income += amount;
    else cost += amount;
  });

  return {
    income: income ? income : null,
    cost: cost ? cost : null,
  };
};

export const getCostSumGroupByCategory = () => {
  const AllHistory = getState({
    key: storeKeys.CURRENT_HISTORY,
  })
    .map(({ data }) => data)
    .flat();
  const costCategory = getState({ key: storeKeys.CATEGORY })
    .filter(({ isIncome }) => !isIncome)
    .map(({ id, content }) => {
      return { id, content, sum: 0 };
    });

  AllHistory.forEach(({ categoryId, isIncome, amount }) => {
    if (!isIncome) {
      for (let item of costCategory) {
        if (item.id === categoryId) {
          item.sum += amount;
          break;
        }
      }
    }
  });

  return costCategory.sort((a, b) => b.sum - a.sum);
};

export const getAmountSumOfCategory = async (months, categoryId) => {
  const promises = months.map(({ year, month }) =>
    getAmountSumPerCategory(year, month, categoryId),
  );

  try {
    const data = await Promise.all(promises);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

/* 결제 방법 관련 */
export const updatePayment = async () => {
  const payment = await getAllPaymentAPI();
  setState({ key: storeKeys.PAYMENT, newState: payment });
};

// 결제 수단 추가
export const createPayment = async (content) => {
  if (!content) return;
  const response = await postPaymentAPI(content);
  const newPayment = response;
  setState({ key: storeKeys.PAYMENT, newState: newPayment });
};

// 결제 수단 삭제
export const deletePayment = async (payment) => {
  const payments = getState({ key: storeKeys.PAYMENT });
  const paymentId = payments.filter(({ content }) => content === payment)[0].id;
  const response = await deletePaymentAPI(paymentId);
  const newPayment = response;
  setState({ key: storeKeys.PAYMENT, newState: newPayment });
};

/* 카테고리 관련 */
export const updateCategory = async () => {
  const category = await getAllCategoryAPI();
  setState({ key: storeKeys.CATEGORY, newState: category });
};

export const getCategoryById = (categoryId) => {
  const category = getState({ key: storeKeys.CATEGORY });
  return category.filter(({ id }) => id === categoryId)[0];
};
