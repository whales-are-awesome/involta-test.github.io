import { GetterTree, MutationTree, ActionTree  } from 'vuex';
import API from '@/helpers/api';

interface IState {
    address: string
}

function state(): IState {
    return {
        address: ''
    };
}

const getters: GetterTree<IState, any> = {
};

const mutations: MutationTree<IState> = {
    setAddress(state, payload: IState['address']) {
        state.address = payload;
    }
};

const actions: ActionTree<IState, any> = {
    async updateAddress({ commit }, payload: IState['address']) {
        let address = '';

        if (!payload) {
            address = await API.getCurrentAddress();
        }

        commit('setAddress', address || payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
