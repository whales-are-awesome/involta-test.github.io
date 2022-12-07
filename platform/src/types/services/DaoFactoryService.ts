import { IPaginationParams } from '@/types/api'


interface ICreateDaoParams {
    proposalExpirationTime: number
    quorumRequired: number
}

interface ICreateDaoResponse {
    hash: string
}

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

interface IDaoParams {
    address: string
}

interface INormalizedDaoAsDefault extends IDao {
    fullName: string
    path: {name: string, address: string, fullName: string}[]
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

interface ISubDaoItemParams {
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
    ICreateDaoParams,
    ICreateDaoResponse,
    IDao,
    IDaoParams,
    INormalizedDaoAsDefault,

    IDaoItem,
    IDaoItemParams,
    INormalizedDaoItemAsTable,


    ISubDaoItem,
    ISubDaoItemParams,
    ISubDaoItemQuery,
    INormalizedSubDaoItemAsDefault,


    IProposal,
    IProposalParams,

    IProposalItem,
    IProposalItemQuery,
    INormalizedProposalItem,
}
