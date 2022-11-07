import { createApp, h, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable';
import Maska from 'maska';
import { svgSpritePlugin } from 'vue-svg-sprite'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import API from './helpers/api';
import apolloClient from './plugins/apollo';
import clickOutside from './directives/clickOutside';
import './assets/styles/global.css';

const app = createApp({
    async beforeCreate() {
        await API.init();
    },
    setup () {
        provide(DefaultApolloClient, apolloClient)
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
.use(router);

app.mount('#app');
