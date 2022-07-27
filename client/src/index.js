import './style/reset.scss';
import './index.scss';

import { HistoryView } from './view/HistoryView';
import { addState } from './store';
import { updateCategory, updateHistories, updatePayment } from './controller';
import { storeKeys } from './utils/constant';
import { CalendarView } from './view/CalendarView';
import { Router } from './router/Router';

const initStore = () => {
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

const initRouter = () => {
  Router.init(document.getElementById('root'), {
    '/': HistoryView,
    '/history': HistoryView,
    '/calendar': CalendarView,
    '/404': NotFoundView,
  });
};

initStore();
initRouter();
