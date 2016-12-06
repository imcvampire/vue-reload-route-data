'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var vueReloadRouteData = {};

  vueReloadRouteData.install = function install(Vue) {
    var _mixin;

    if (vueReloadRouteData.installed) return;
    vueReloadRouteData.installed = true;

    var isVersion1 = Vue.version[0] == '1';
    var mixin = (_mixin = {}, _defineProperty(_mixin, isVersion1 ? 'init' : 'beforeCreate', function () {
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
    }), _defineProperty(_mixin, 'created', initWatcher), _defineProperty(_mixin, 'beforeDestroy', destroyWatcher), _defineProperty(_mixin, isVersion1 ? 'attached' : 'activated', initWatcher), _defineProperty(_mixin, isVersion1 ? 'detached' : 'deactivated', destroyWatcher), _mixin);

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

  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == "object") {
    module.exports = vueReloadRouteData;
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return vueReloadRouteData;
    });
  } else if (window.Vue) {
    Vue.use(vueReloadRouteData);
  }
})();