import Vue from 'vue'
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import Timeline from "primevue/timeline";
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';

Vue.use(PrimeVue, {ripple: true});
Vue.use(ConfirmationService);
Vue.use(ToastService);

Vue.component('Timeline', Timeline);
Vue.component('Card', Card);
Vue.component('Button', Button);
Vue.component('Dialog', Dialog);
Vue.component('ConfirmPopup', ConfirmPopup);
Vue.component('Toast', Toast);
Vue.component('InputText', InputText);
Vue.component('Textarea', Textarea);
Vue.component('Calendar', Calendar);