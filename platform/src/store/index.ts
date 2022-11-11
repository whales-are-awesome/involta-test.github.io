import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import breadcrumbs from './breadcrumbs'
import layer from './layer'
import wallet from './wallet'
import isMobile from './isMobile'

export interface State {
    breadcrumbs: any
    layer: any
    wallet: any
    isMobile: any
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    modules: {
        breadcrumbs,
        layer,
        isMobile,
        wallet
    }
})

export function useStore () {
    return baseUseStore(key)
}
