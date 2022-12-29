import { MutationTree, ActionTree  } from 'vuex';
import { IRootState } from './index';
import { IDao } from '@/types/services/DaoService';

interface IState {
    data: IDao | null
    pending: boolean
}

function state(): IState {
    return {
        data: null,
        pending: true
    };
}

const mutations: MutationTree<IState> = {
    setData(state, payload: IState) {
        if (payload.data) {
            state.data = payload.data;
        }
        if (payload.pending != null) {
            state.pending = payload.pending;
        }
    },
    updateData(state, payload: IState['data']) {
        if(!payload) {
            return;
        }

        state.data = {
            ...state.data,
            ...payload
        };
    },
    removeData(state) {
        state.data = null;
        state.pending = true;
    },
};

const actions: ActionTree<IState, IRootState> = {
    async setData({ commit }, payload: IState['data']) {
        commit('setData', payload);
    },
    async removeData({ commit }) {
        commit('removeData');
    },
    async updateData({ commit }, payload: IState['data']) {
        commit('updateData', payload);
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}

export {
    IState
}
