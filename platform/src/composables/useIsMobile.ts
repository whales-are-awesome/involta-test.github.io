import { computed } from 'vue';
import { store } from '@/store';

interface I {
    xl: boolean
    lg: boolean
    md: boolean
    sm: boolean
}

let isInit = false;

function useIsMobile() {
    if (!isInit) {
        init();
    }

    return computed<I>(() => {
        const width = store.state.isMobile.width;

        return {
            xl: width > 1280,
            lg: width > 960 && width <= 1280,
            md: width > 600 && width <= 960,
            sm: width <= 600
        }
    });
}

function init() {
    isInit = true;
    store.dispatch('isMobile/setWidth', document.documentElement.offsetWidth);

    window.addEventListener('resize', () => {
        store.dispatch('isMobile/setWidth', document.documentElement.offsetWidth);
    });
}

export default useIsMobile;
