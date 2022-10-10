import { computed, watch }  from 'vue';
import { store }  from '@/store';

const appElement = document.querySelector<HTMLElement>('body')!;

async function open(name: string, props?: object) {
    const layer = await store.dispatch('layer/add', name);

    await store.dispatch('layer/update', {
        id: layer.id,
        isOpened: true,
        props
    });


}

async function confirm(params: object) {
    await open('ConfirmLayer', params);
}

async function alert(params: object) {
    await open('AlertLayer', params);
}

async function close(name?: string) {
    await store.dispatch('layer/close', name);
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
        if (newValue) {
            appElement.style.overflow = 'hidden';
            appElement.style.paddingRight = '14px';
        } else if (appElement) {
            appElement.style.overflow = 'auto';
            appElement.style.paddingRight = '0';
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
