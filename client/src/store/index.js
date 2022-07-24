import useState from '../core/Observable';

const store = new Map();

export const addState = ({key, initState}) => {
  store.get(key) ?? store.set(key, useState(initState))
}

export const removeState = ({key}) => {
  store.delete(key);
}

export const getState = ({key}) => {
  return store.get(key).getState();
}

export const setState = ({key, newState}) => {
  return store.get(key).setState(newState);
}

export const subscribeState = ({key, callback}) => {
  return store.get(key)?.subscribe(callback);
}