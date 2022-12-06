import { IWithTotalParams } from '@/models/api'

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

interface IDaoItem extends IDao {
}

interface INormalizedDaoAsDefault extends IDao {
    fullName: string
    path: {name: string, address: string, fullName: string}[]
}

interface INormalizedDaoItemAsTable extends IDao {
    fullName: string
}

interface IDaoItemParams extends IWithTotalParams {
    search: string
    voteId: number | string
    statusId: number | string
}

interface ICreateDaoParams {
    proposalExpirationTime: number
    quorumRequired: number
}

interface ISubDaoItem {
    address: string
    network: string
    parent: string
    name: string
    image: string
}

interface ISubDaoItemParams extends IWithTotalParams {

}

interface INormalizedSubDaoItemAsDefault extends ISubDaoItem {
    fullName: string
    isHovered: boolean
}

// interface IDaoCreateParams {
//     _proposalExpirationTime
//     _quorumRequired
//     _parentRegistry
// }

interface IProposalItemsParams {
    search: string
    voteId: number | string
    statusId: number | string
}

interface IProposal {
    governance: string
}

interface IProposalItem extends Pick<IProposal, 'governance'> {
}

interface INormalizedProposalItem extends Pick<IProposal, 'governance'> {
}

export {
    IDaoItemParams,
    IDaoItem,
    INormalizedDaoItemAsTable,
    IDao,
    IProposalItemsParams,
    IProposal,
    IProposalItem,
    INormalizedProposalItem,
    INormalizedDaoAsDefault,
    ISubDaoItem,
    INormalizedSubDaoItemAsDefault,
    ISubDaoItemParams,
    ICreateDaoParams
}
