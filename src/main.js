import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index.js";
import {currency} from "@/currency.js";

Vue.config.productionTip = false;
Vue.filter('currency', currency)

new Vue({
  el:'#app',
  router,
  store,
  currency,
  render: (h) => h(App),
}).$mount("#app");
