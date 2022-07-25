import './style/reset.scss';
import './index.scss';

import { HistoryView } from './view/HistoryView';
import { addState } from './store';
import { updateCategory, updateHistories, updatePayment } from './controller';
import { storeKeys } from './utils/constant';

// initStore
const initStore = () => {
  // state 선언
  addState({
    key: storeKeys.CURRENT_DATE,
    initState: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
  });
  addState({ key: storeKeys.CURRENT_HISTORY, initState: [] });
  addState({ key: storeKeys.SELECTED_HISTORY, initState: {} });
  addState({ key: storeKeys.LAST_SIX_HISTORY, initState: [] });
  addState({ key: storeKeys.CATEGORY, initState: [] });
  addState({ key: storeKeys.PAYMENT, initState: [] });

  updateCategory();
  updateHistories();
  updatePayment();
};

initStore();
new HistoryView(document.getElementById('root'));
