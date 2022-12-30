import { IPaginationParams } from '@/types/api'

interface IDao {
    address: string
    creationTx: string
    followersAmount: number
    isFollowed: boolean
    network: string
    parentDao: string
    rootDao: string
    creator: string
    name: string
    description: string
    link: string
    image: string
    path: {name: string, address: string}[]
}

interface IDaoPath {
    address: string
    network: string
}

interface INormalizedDaoAsDefault extends IDao {
    fullName: string
    followersAmountFormatted: string
    path: {name: string, address: string, fullName: string}[]
}

interface ICreateDaoParams {
    proposalExpirationTime: number
    quorumRequired: number
    parentRegistry?: string
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

export {
    IDao,
    IDaoPath,
    INormalizedDaoAsDefault,
    ICreateDaoParams,
    ICreateDaoResponse,
    IChangeDaoParams,

    IDaoItem,
    IDaoItemParams,
    INormalizedDaoItemAsTable,

    IPaginationParams
}