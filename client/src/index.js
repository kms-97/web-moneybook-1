import './style/reset.scss';
import './index.scss';

import { HistoryView } from './view/HistoryView';
import { addState, setState } from './store';
import { updateCategory, updateHistories, updatePayment } from './controller';
import { storeKeys } from './utils/constant';
import { CalendarView } from './view/CalendarView';
import { Router } from './router/Router';
import { NotFoundView } from './view/NotFoundView';
import { StatisticsView } from './view/StatisticsView';

const initStore = async () => {
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
  addState({
    key: storeKeys.ISCHECKED_FILTER,
    initState: { income: true, cost: true },
  });
  addState({ key: storeKeys.ISLOADING, initState: false });

  setState({ key: storeKeys.ISLOADING, newState: true });
  await Promise.all([updateCategory(), updateHistories(), updatePayment()]);
  setState({ key: storeKeys.ISLOADING, newState: false });
};

const initRouter = () => {
  Router.init(document.getElementById('root'), {
    '/': HistoryView,
    '/history': HistoryView,
    '/calendar': CalendarView,
    '/statistics': StatisticsView,
    '/404': NotFoundView,
  });
};

initStore();
initRouter();
