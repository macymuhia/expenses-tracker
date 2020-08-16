import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import * as mdbvue from 'mdbvue'
import { ValidationObserver, ValidationProvider, extend } from "vee-validate"
import * as rules from "vee-validate/dist/rules"
import { messages } from "vee-validate/dist/locale/en.json";

for (const component in mdbvue) {
Vue.component(component, mdbvue[component])
}
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  });
});
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
