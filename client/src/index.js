import './style/reset.scss';
import './index.scss';

import { getMockHistory } from './utils/generateMockData';
import { HistoryView } from './view/HistoryView';
import store from './store/store.js';

new HistoryView(document.getElementById('root'));

// init
getMockHistory(7).then((result) =>
  store.historyInfo.subscribe()[1]({
    year: 2022,
    month: 7,
    history: [...result],
  }),
);
