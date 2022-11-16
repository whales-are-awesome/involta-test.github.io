import { GetterTree, MutationTree, ActionTree  } from 'vuex';
import { IRootState } from './index';

type wallets = 'injectedWallet' | 'connectWallet' | '';

interface IState {
    address: string | null
    wallet: wallets
}

function state(): IState {
    return {
        address: null,
        wallet: ''
    };
}

const getters: GetterTree<IState, any> = {
    loggedIn: (state) => !!state.address
};

const mutations: MutationTree<IState> = {
    setAddress(state, payload: IState['address']) {
        state.address = payload;
    },
    setWallet(state, payload: IState['wallet']) {
        state.wallet = payload;
    }
};

const actions: ActionTree<IState, IRootState> = {
    setAddress({ commit }, payload: IState['address']) {
        commit('setAddress', payload);
    },
    setWallet({ commit }, payload: IState['wallet']) {
        commit('setWallet', payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}

export {
    IState
}
