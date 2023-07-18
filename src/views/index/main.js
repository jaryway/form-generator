import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/styles/index.scss'
import '@/icons'
import axios from 'axios'
import Tinymce from '@/components/tinymce/index.vue'
import MyAddress from '@/components/my-address/index.vue'
import Address from '@/form-components/address/index.vue'
import Divider from '@/form-components/divider/index.vue'
import DatePicker from '@/form-components/date-picker/index.vue'
import CheckboxGroup from '@/form-components/checkbox-group/index.vue'
import InputNumber from '@/form-components/input-number/index.vue'
import Input from '@/form-components/input/index.vue'
import LinkData from '@/form-components/link-data/index.vue'
import LinkQuery from '@/form-components/link-query/index.vue'
import Location from '@/form-components/location/index.vue'
import RadioGroup from '@/form-components/radio-group/index.vue'
import Select from '@/form-components/select/index.vue'
import SignPad from '@/form-components/sign-pad/index.vue'
import Subform from '@/form-components/subform/index.vue'
import FgTinymce from '@/form-components/tinymce/index.vue'
import Upload from '@/form-components/upload/index.vue'

Vue.component('tinymce', Tinymce)
Vue.component('MyAddress', MyAddress)
Vue.component('FgAddress', Address)
Vue.component('FgInput', Input)
Vue.component('FgInputNumber', InputNumber)
Vue.component('FgCheckboxGroup', CheckboxGroup)
Vue.component('FgRadioGroup', RadioGroup)
Vue.component('FgDatePicker', DatePicker)
Vue.component('FgDivider', Divider)
Vue.component('FgLinkData', LinkData)
Vue.component('FgLinkQuery', LinkQuery)
Vue.component('FgLocation', Location)
Vue.component('FgSelect', Select)
Vue.component('FgSignPad', SignPad)
Vue.component('FgSubform', Subform)
Vue.component('FgTinymce', FgTinymce)
Vue.component('FgUpload', Upload)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
