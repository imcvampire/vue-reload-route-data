(function () {
  let vueReloadRouteData = {}

  vueReloadRouteData.install = function install(Vue, {
    immediate = true,
  }) {

    if (vueReloadRouteData.installed) return;
    vueReloadRouteData.installed = true;

    const mixin = {
      beforeCreate() {
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
      activated: initWatcher,
      deactivated: destroyWatcher
    };

    Vue.mixin(mixin);

    function initWatcher() {
      if (this.$options.fetchRouteData && !this._unwatch$route) {
        this._unwatch$route = this.$watch(
          '$route',
          function () {
            this.$options.fetchRouteData.apply(this, arguments);
          },
          { immediate }
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