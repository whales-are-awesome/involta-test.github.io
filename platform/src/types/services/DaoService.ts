import { IDaoAPI } from '@/types/entries/dao';
import { IPaginationParams } from '@/types/api';
import { NetworksType } from '@/types/networks';

interface IDao extends IDaoAPI {
    votingPower: number
}

interface IDaoPath {
    address: string
    network: NetworksType
}

interface INormalizedDaoAsDefault extends IDao {
    fullName: string
    followersAmountFormatted: string
    path: {name: string, address: string, fullName: string}[]
}

interface ICreateDaoParams {
    name: string
    governanceTokenSupply: number
    governanceTicker: string
    proposalExpirationTime: number
    quorumRequired: number
    parentRegistry?: string
    network?: NetworksType
}


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

interface ICreateDaoResponse {
    hash: string
}

interface IChangeDaoParams {
    name: string
    description: string
    link: string
    image?: string
}

interface IDaoItem extends IDao {
}

interface IDaoItemParams extends IPaginationParams {
    search: string
    voteId: number | string
    statusId: number | string
}

interface INormalizedDaoItemAsTable extends IDao {
    fullName: string
    followersAmountFormatted: string
}


interface IDaoTransactionCookie {
    network: NetworksType
    hash: string
    name: string
    description: string
    link: string
    image?: string
}


import { IFollowerAPI } from '@/types/entries/follower';

interface IFollower extends IFollowerAPI {
    name: string
    votingPower: number
    tokens: number
}

export {
    IDao,
    IDaoPath,
    INormalizedDaoAsDefault,
    ICreateDaoParams,
    ICreateDaoResponse,
    IChangeDaoParams,

    ISubDaoItem,
    ISubDaoItemQuery,
    INormalizedSubDaoItemAsDefault,

    IFollower,

    IDaoItem,
    IDaoItemParams,
    INormalizedDaoItemAsTable,

    IPaginationParams,

    IDaoTransactionCookie
}
