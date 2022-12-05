import { inject } from 'vue';
import VueCookies from 'vue-cookies';

const $cookies = inject<typeof VueCookies>('$cookies');
