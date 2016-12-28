# vue-reload-route-data
A small Vuejs mixin for reload route data manually. Mainly inspired by https://gist.github.com/fnlctrl/1cf9da63493e0fe78181a4f4e2cc6f64

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

## How to use:
Send all your code to load route data to `fetchRouteData`.
```js
export default {
  data() {
    return {
      data: {}
    ]
  },
  
  fetchRouteData() {
    // Get your route data
    
    this.$set(this, 'data', someRouteData)
  }
}
```

After that, you can call `reloadRouteData` anytime you want to reload data.
