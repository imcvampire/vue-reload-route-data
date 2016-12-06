"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var vueReloadRouteData = {};

  vueReloadRouteData.install = function install(Vue) {
    if (vueReloadRouteData.installed) return;
    vueReloadRouteData.installed = true;

    var mixin = {
      beforeCreate: function beforeCreate() {
        var _this = this;

        if (this.$options.fetchRouteData) {
          !this.$options.methods && (this.$options.methods = {});

          /**
           * Utility method for reloading route data
           */
          this.$options.methods.$reloadRouteData = function () {
            return _this.$options.fetchRouteData(_this.$route);
          };
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
        this._unwatch$route = this.$watch('$route', function () {
          this.$options.fetchRouteData.apply(this, arguments);
        }, { immediate: true });
      }
    }
  };

  function destroyWatcher() {
    this._unwatch$route && this._unwatch$route();
    this._unwatch$route = null;
  }

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object") {
    module.exports = vueReloadRouteData;
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return vueReloadRouteData;
    });
  } else if (window.Vue) {
    Vue.use(vueReloadRouteData);
  }
})();