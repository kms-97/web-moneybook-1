import useState from '../utils/Observable';

export default {
  date: useState({
    month: 5,
    year: 2022,
  }),
  history: useState([
    {
      id: 1,
      date: '2022-07-21',
      categoryId: 1,
      paymentId: 2,
      amount: 30000,
      isIncome: true,
    },
    {
      id: 2,
      date: '2022-07-24',
      categoryId: 3,
      paymentId: 2,
      amount: 15000,
      isIncome: false,
    },
    {
      id: 3,
      date: '2022-07-26',
      categoryId: 6,
      paymentId: 1,
      amount: 1324000,
      isIncome: false,
    },
  ]),
  category: useState([
    {
      id: 1,
      content: '월급',
      isIncome: true,
    },
    {
      id: 2,
      content: '용돈',
      isIncome: true,
    },
    {
      id: 3,
      content: '식비',
      isIncome: false,
    },
    {
      id: 4,
      content: '생활',
      isIncome: false,
    },
    {
      id: 5,
      content: '교통',
      isIncome: false,
    },
    {
      id: 6,
      content: '여가',
      isIncome: false,
    },
  ]),
  payment: useState([
    {
      content: '현대카드',
      id: 1,
    },
    {
      content: '국민카드',
      id: 2,
    },
  ]),
  selectedId: useState(null),
};
