import { IPaginationParams } from '@/types/api';
import { NetworksType } from '@/types/networks';

interface ISubDaoItem {
    address: string
    network: NetworksType
    parent: string
    name: string
    image: string
}

interface ISubDaoItemQuery extends IPaginationParams {

}

interface INormalizedSubDaoItemAsDefault extends ISubDaoItem {
    fullName: string
    isHovered: boolean
}

interface ISubDaoItemQuery extends IPaginationParams {

}


export {
    ISubDaoItem,
    ISubDaoItemQuery,
    INormalizedSubDaoItemAsDefault,

    IPaginationParams
}
