import {
  createBrowserHistory,
  createMemoryHistory
} from 'history';

const history = createMemoryHistory();

export function pushToHistory(pathname) {
  history.push({ pathname });
  return true;
}

export function goBack() {
  history.goBack();
}

export function goForward() {
  history.goForward();
}

export function getHistory() {
  return history;
}