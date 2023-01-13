//@ts-ignore
import {v4 as uuidv4} from 'uuid';

let id = 0;

function createId(name = '') {
    return name + ++id;
}

export {
    id,
    createId,
    uuidv4
};
