import { IDaoAPI } from '@/types/entries/dao'
import { IPaginationParams } from '@/types/api'

interface IDao extends IDaoAPI {
    votingPower: number
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
    name: string
    governanceTokenSupply: number
    governanceTicker: string
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


interface IDaoTransactionCookie {
    network: string
    hash: string
    name: string
    description: string
    link: string
    image?: string
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

    IPaginationParams,

    IDaoTransactionCookie
}
