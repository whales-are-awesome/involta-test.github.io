import { createApp, h, provide } from 'vue'
import VueCookies from 'vue-cookies'
import { DefaultApolloClient } from '@vue/apollo-composable';
import Notifications from '@kyvg/vue3-notification'
import Maska from 'maska';
import { svgSpritePlugin } from 'vue-svg-sprite'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import apolloClient from './plugins/apollo';
import clickOutside from './directives/clickOutside';
import BaseImage from '@/components/BaseImage/BaseImage.vue';
import './assets/styles/global.css';

const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient);
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
.use(Notifications)
.use(VueCookies, { expires: '7d'})
.use(router);

app.component('BaseImage', BaseImage);

app.mount('#app');
