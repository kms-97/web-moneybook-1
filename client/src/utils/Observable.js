export default function (state) {
  const observers = new Set();
  let myState = state;

  function subscribe(observer) {
    observers.add(observer);

    return [getState, setState];
  }
  function unsubscribe(observer) {
    observers.delete(observer);
  }
  function notify() {
    observers.forEach((observer) => {
      observer.sendNotify();
    });
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
    subscribe,
    unsubscribe,
  };
}
