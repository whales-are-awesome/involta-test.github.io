import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import breadcrumbs from './breadcrumbs'
import layer from './layer'
import web3 from './web3'

export interface State {
    breadcrumbs: any
    layer: any
    web3: any
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    modules: {
        breadcrumbs,
        layer,
        web3
    }
})

export function useStore () {
    return baseUseStore(key)
}
