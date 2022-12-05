import { MutationTree, ActionTree  } from 'vuex';
import { IRootState } from './index';

interface IState {

}

function state(): IState {
    return {

    };
}

const mutations: MutationTree<IState> = {

};

const actions: ActionTree<IState, IRootState> = {

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
