import { createApp, h } from 'vue'
import Maska from 'maska';
import { svgSpritePlugin } from 'vue-svg-sprite'
import FloatingVue from 'floating-vue'
import VueKinesis from 'vue-kinesis';
import AOS from 'aos';
import 'aos/dist/aos.css'
import App from './App.vue'
import { store, key } from './store'
import API from './helpers/api';
import './plugins/stripe-gradient';
import clickOutside from './directives/clickOutside';
import './assets/styles/global.css';

const app = createApp({
    beforeCreate() {
        new API();
    },
    mounted() {
        AOS.init({
            once: true
        });
    },
    render: () => h(App)
})
.directive('click-outside', clickOutside)
.use(store, key)
.use(svgSpritePlugin, {
    url: require('./assets/sprite/gen/sprite.svg'),
    class: 'base-icon',
})
.use(Maska)
.use(FloatingVue)
.use(VueKinesis)
.mount('#app');

// @ts-ignore
app.use(FloatingVue);

