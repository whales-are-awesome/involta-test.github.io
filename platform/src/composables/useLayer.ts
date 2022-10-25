import { computed, watch }  from 'vue';
import { store }  from '@/store';
import emitter from '@/plugins/mitt';

const appElement = document.querySelector<HTMLElement>('html')!;

async function open(name: string, props?: object) {
    const layer = await store.dispatch('layer/add', name);

    await store.dispatch('layer/update', {
        id: layer.id,
        isOpened: true,
        props
    });

    return await new Promise(resolve => {
        emitter.on('layerClose', ({ id, params }) => {
            if (id === layer.id) {
                resolve(params);
            }
        });
    });
}

async function confirm(params: object): Promise<any> {
    return await open('ConfirmLayer', params);
}

async function alert(params: object): Promise<any> {
    return await open('AlertLayer', params);
}

async function close(id: string, params?: any) {
    await store.dispatch('layer/close', id);

    emitter.emit('layerClose', { id, params });
}

async function closeLast() {
    const last = store.state.layer.items.at(-1);

    if (last) {
        await store.dispatch('layer/close', last.id);
    }
}

function useLayer() {
    const items = computed(() => store.state.layer.items);
    const openedItems = computed(() => items.value.filter((item: any) => item.isOpened));
    const isBlackoutShown = computed(() => items.value.some((item: any) => item.isOpened && !item.hideBlackout));

    watch(() => isBlackoutShown.value, (newValue) => {
        const coords = appElement.getBoundingClientRect();

        if (newValue) {
            appElement.style.position = 'fixed';
            appElement.style.top = coords.top + 'px';
            appElement.style.left = coords.left + 'px';
            appElement.style.paddingRight = '10px';
        } else if (appElement) {
            const scrollTo = Math.abs(+appElement.style.top.slice(0, -2));

            appElement.style.removeProperty('position');
            appElement.style.removeProperty('top');
            appElement.style.removeProperty('left');
            appElement.style.removeProperty('paddingRight');

            if (scrollTo !== 0) {
                appElement.scrollTop = scrollTo;
            }
        }
    }, { deep: true, immediate: true });

    return {
        items,
        openedItems,
        isBlackoutShown,
        open,
        confirm,
        alert,
        close,
        closeLast
    };
}

export default useLayer;