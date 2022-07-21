import useState from '../utils/Observable';

export default {
  historyInfo: useState({
    month: '',
    year: '',
    history: [],
  }),
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
