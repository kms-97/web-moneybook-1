export const Router = (function () {
  let instance;

  function setInstance($target, mapper) {
    const target = $target;
    const myMapper = { ...mapper };

    function push(url) {
      if (window.location.pathname !== url) {
        window.history.pushState(null, '', url);
      }

      route();
    }

    (function pop() {
      window.addEventListener('popstate', () => {
        route();
      });
    })();

    function route() {
      target.innerHTML = '';
      const url = window.location.pathname;
      const Component = myMapper[url] ?? myMapper['/404'];
      new Component(target);
    }

    return { push, route };
  }

  return {
    init: ($target, mapper) => {
      if (!instance) instance = setInstance($target, mapper);
      instance.route();
    },

    getInstance: () => {
      return instance;
    },
  };
})();
