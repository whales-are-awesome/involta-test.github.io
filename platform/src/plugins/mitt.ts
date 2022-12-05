import mitt from 'mitt';

interface ICloseProps {
    params?: any
    id: string
}

type Events = {
    layerClose: ICloseProps
    daoCreated: void
};

const emitter = mitt<Events>();

export default emitter;
