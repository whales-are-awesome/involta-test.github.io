import mitt from 'mitt';

interface ICloseProps {
    params?: any
    id: string
}

type Events = {
    layerClose: ICloseProps
    daoFollowed: void
    daoEdited: void
    daoCreated: void
    proposalCreated: void
    accountChanged: void
    networkChanged: void
};

const emitter = mitt<Events>();

export default emitter;
