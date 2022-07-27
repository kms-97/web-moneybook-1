export default function (initState) {
  const observers = new Set();
  let state = initState;

  function subscribe(fn) {
    observers.add(fn);

    function unsubscribe() {
      observers.remove(fn);
    }

    return unsubscribe;
  }

  function notify() {
    observers.forEach((fn) => fn());
  }

  // 단순 주소 비교는 의미가 없고, 깊은 비교를 통해 값이 같은지 확인해야 함.
  function setState(newState) {
    if (
      state === newState ||
      JSON.stringify(state) === JSON.stringify(newState)
    )
      return;
    state = newState;
    notify();
  }

  function getState() {
    return state;
  }

  return {
    getState,
    setState,
    subscribe,
  };
}
