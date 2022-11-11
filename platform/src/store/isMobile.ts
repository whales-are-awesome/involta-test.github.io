import { ActionTree, MutationTree } from 'vuex';

interface IState {
    width: number
}

function state(): IState {
    return {
        width: 0
    };
}

const mutations: MutationTree<IState> = {
    setWidth: (state: any, payload: IState['width']) => state.width = payload
};

const actions: ActionTree<IState, any> = {
    setWidth({ commit }, payload: IState['width']) {
        commit('setWidth', payload);
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
