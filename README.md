# vue-reload-route-data
A small Vuejs mixin for reload route data manually

## How to install:
### CommonJS:
```
npm install --save vue-reload-route-data
```

And in your entry file:
```
import Vue from 'vue'
import VueReloadRouteData from 'vue-reload-route-data'

Vue.use(VueReloadRouteData, {
  immediate: true
})

`immediate` will be passed to 3rd param of `$watch` for `$route`
```

### Script:
Just add 3 scripts in order: `vue`, `vue-reload-route-data` to your `document`.
