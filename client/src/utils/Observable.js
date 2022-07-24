export default function (state) {
  const observers = new Set();
  let myState = state;

  function subscribe(fn) {
    observers.add(fn);

    function unsubscribe() {
      observers.remove(fn);
    }

    return unsubscribe;
  }
  function unsubscribe(observer) {
    observers.delete(observer);
  }
  function notify() {
    observers.forEach((fn) => fn());
  }

  function setState(state) {
    if (myState === state) return;
    myState = state;
    notify();
  }
  function getState() {
    return myState;
  }

  return {
    get: getState,
    set: setState,
    subscribe,
  };
}
