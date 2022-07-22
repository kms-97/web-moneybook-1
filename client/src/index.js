import './style/reset.scss';
import './index.scss';

import { getMockHistory } from './utils/generateMockData';
import { HistoryView } from './view/HistoryView';
import { historyStore } from './store/store.js';

new HistoryView(document.getElementById('root'));

// init
getMockHistory(7).then((result) => historyStore.set(result));
