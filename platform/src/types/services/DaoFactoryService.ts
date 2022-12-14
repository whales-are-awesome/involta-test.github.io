import { IPaginationParams } from '@/types/api'

interface IDao {
    address: string
    network: string
    parentDao: string
    rootDao: string
    creator: string
    block: number,
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
}


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


interface IFollowDaoParams {
    account: string
}

interface IFollower {
    address: string
}


interface ISubDaoItemQuery extends IPaginationParams {

}

interface INormalizedSubDaoItemAsDefault extends ISubDaoItem {
    fullName: string
    isHovered: boolean
}


interface IProposal {
    governance: string
}

interface IProposalParams {
    id: string
}

interface IProposalItem extends Pick<IProposal, 'governance'> {
}

interface IProposalItemQuery {
    search: string
    voteId: number | string
    statusId: number | string
}

interface INormalizedProposalItem extends Pick<IProposal, 'governance'> {
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


    ISubDaoItem,
    ISubDaoItemQuery,
    INormalizedSubDaoItemAsDefault,

    IFollowDaoParams,
    IFollower,

    IProposal,
    IProposalParams,

    IProposalItem,
    IProposalItemQuery,
    INormalizedProposalItem,

    IPaginationParams
}
