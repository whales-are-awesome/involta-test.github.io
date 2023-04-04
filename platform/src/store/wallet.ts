import { GetterTree, MutationTree, ActionTree  } from 'vuex';
import { IRootState } from './index';
import cutAddress from '@/helpers/cutAddress';
import API from '@/helpers/api';

type wallets = 'injectedWallet' | 'connectWallet' | '';

interface IState {
    address: string | null
    ensName: string | null
    wallet: wallets
    network: string
}

function state(): IState {
    return {
        address: null,
        ensName: '',
        wallet: '',
        network: ''
    };
}

const getters: GetterTree<IState, any> = {
    loggedIn: (state) => !!state.address,
    croppedAddress: (state) => cutAddress(state.address as string),
    addressOrName: (state) => state.ensName || cutAddress(state.address as string)
};

const mutations: MutationTree<IState> = {
    setAddress(state, payload: IState['address']) {
        state.address = payload;
    },
    setNetwork(state, payload: IState['network']) {
        state.network = payload;
    },
    setWallet(state, payload: IState['wallet']) {
        state.wallet = payload;
    },
    setAddressEnsName(state, payload: IState['ensName']) {
        state.ensName = payload;
    },

};

const actions: ActionTree<IState, IRootState> = {
    setAddress({ commit }, payload: IState['address']) {
        commit('setAddress', payload);
    },
    setNetwork({ commit }, payload: IState['network']) {
        commit('setNetwork', payload);
    },
    setWallet({ commit }, payload: IState['wallet']) {
        commit('setWallet', payload);
    },
    async fetchAndSetEnsName({ commit, state }) {
        const addressName = await API.provider.lookupAddress(state.address);

        commit('setAddressEnsName', addressName);
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
