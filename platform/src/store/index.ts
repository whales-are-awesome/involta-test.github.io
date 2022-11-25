import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import breadcrumbs, { IState as IBreadcrumbsState } from './breadcrumbs'
import layer, { IState as ILayerState } from './layer'
import wallet, { IState as IWalletState } from './wallet'
import isMobile, { IState as IIsMobileState } from './isMobile'
import error, { IState as IErrorState } from './error'
import dao, { IState as IDaoState } from './dao'

export interface IRootState {
    breadcrumbs: IBreadcrumbsState
    layer: ILayerState
    wallet: IWalletState
    isMobile: IIsMobileState
    error: IErrorState
    dao: IDaoState
}

export const key: InjectionKey<Store<IRootState>> = Symbol();

export const store = createStore<IRootState>({
    modules: {
        breadcrumbs,
        layer,
        isMobile,
        wallet,
        error,
        dao
    }
});

export function useStore () {
    return baseUseStore(key);
}
