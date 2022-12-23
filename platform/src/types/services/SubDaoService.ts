import { IPaginationParams } from '@/types/api'

interface ISubDaoItem {
    address: string
    network: string
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
