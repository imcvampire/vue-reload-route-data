(function () {
  const vueReloadRouteData = {}

  vueReloadRouteData.install = function install(Vue) {
    if (vueReloadRouteData.installed) return;
    vueReloadRouteData.installed = true;

    const isVersion1 = Vue.version[0] == '1';
    const mixin = {
      [isVersion1 ? 'init' : 'beforeCreate']() {
        if (this.$options.fetchRouteData) {
          !this.$options.methods && (this.$options.methods = {});

          /**
           * Utility method for reloading route data
           */
          this.$options.methods.$reloadRouteData = () => this.$options.fetchRouteData(this.$route);
        }
      },

      created: initWatcher,
      beforeDestroy: destroyWatcher,

      /* Keep-alive support */
      [isVersion1 ? 'attached' : 'activated']: initWatcher,
      [isVersion1 ? 'detached' : 'deactivated']: destroyWatcher
    };

    Vue.mixin(mixin);

    function initWatcher() {
      if (this.$options.fetchRouteData && !this._unwatch$route) {
        this._unwatch$route = this.$watch(
          '$route',
          function () {
            this.$options.fetchRouteData.apply(this, arguments);
          },
          { immediate: true }
        );
      }
    }
  }

  function destroyWatcher() {
    this._unwatch$route && this._unwatch$route();
    this._unwatch$route = null;
  }

  if (typeof exports == "object") {
    module.exports = vueReloadRouteData;
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return vueReloadRouteData });
  } else if (window.Vue) {
    Vue.use(vueReloadRouteData);
  }
}());