import useState from '../utils/Observable';

export const dateStore = useState({
  month: 7,
  year: 2022,
});
export const historyStore = useState([]);
export const categoryStore = useState([
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
]);
export const paymentStore = useState([
  {
    content: '현대카드',
    id: 1,
  },
  {
    content: '국민카드',
    id: 2,
  },
]);
export const selectedHistoryStore = useState({});
