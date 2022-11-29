interface IDaoItemsParams {
    search: string
    voteId: number | string
    statusId: number | string
}

interface IDao {
    address: string
    network: string
    parentAddress: string
    creator: string
    block: number,
    name: string
    description: string
    link: string
    image: string
    rootDao: string
}

interface IDaoItem extends IDao {
}

interface INormalizedDaoAsDefault extends IDao {
    fullName: string
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
    IDaoItemsParams,
    IDaoItem,
    INormalizedDaoItemAsTable,
    IDao,
    IProposalItemsParams,
    IProposal,
    IProposalItem,
    INormalizedProposalItem,
    INormalizedDaoAsDefault,
    ISubDaoItem,
    INormalizedSubDaoItemAsDefault
}
