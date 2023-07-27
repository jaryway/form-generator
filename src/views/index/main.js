import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/styles/index.scss'
import '@/icons'
import axios from 'axios'
import Tinymce from '@/components/tinymce/index.vue'
// import MyAddress from '@/components/my-address/index.vue'
import Address from '@/form-engine/components/address/index.vue'
import Divider from '@/form-engine/components/divider/index.vue'
import DatePicker from '@/form-engine/components/date-picker/index.vue'
import CheckboxGroup from '@/form-engine/components/checkbox-group/index.vue'
import InputNumber from '@/form-engine/components/input-number/index.vue'
import Input from '@/form-engine/components/input/index.vue'
import LinkData from '@/form-engine/components/link-data/index.vue'
import LinkQuery from '@/form-engine/components/link-query/index.vue'
import Location from '@/form-engine/components/location/index.vue'
import RadioGroup from '@/form-engine/components/radio-group/index.vue'
import Select from '@/form-engine/components/select/index.vue'
import SignPad from '@/form-engine/components/sign-pad/index.vue'
import Subform from '@/form-engine/components/subform/index.vue'
import FgTinymce from '@/form-engine/components/tinymce/index.vue'
import Upload from '@/form-engine/components/upload/index.vue'
import OrgTagInput from '@/form-engine/components/org-tag-input/index.vue'

Vue.component('tinymce', Tinymce)
// Vue.component('MyAddress', MyAddress)
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
Vue.component('FgOrgTagInput', OrgTagInput)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
