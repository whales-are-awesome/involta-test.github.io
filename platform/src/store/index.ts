import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import breadcrumbs, { IState as IBreadcrumbsState } from './breadcrumbs'
import layer, { IState as ILayerState } from './layer'
import wallet, { IState as IWalletState } from './wallet'
import isMobile, { IState as IIsMobileState } from './isMobile'

export interface IRootState {
    breadcrumbs: IBreadcrumbsState
    layer: ILayerState
    wallet: IWalletState
    isMobile: IIsMobileState
}

export const key: InjectionKey<Store<IRootState>> = Symbol();

export const store = createStore<IRootState>({
    modules: {
        breadcrumbs,
        layer,
        isMobile,
        wallet
    }
});

export function useStore () {
    return baseUseStore(key);
}
