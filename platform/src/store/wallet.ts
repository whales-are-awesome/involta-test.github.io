import { GetterTree, MutationTree, ActionTree  } from 'vuex';

interface IState {
    address: string | null
}

function state(): IState {
    return {
        address: null
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
    setAddress({ commit }, payload: IState['address']) {
        commit('setAddress', payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
