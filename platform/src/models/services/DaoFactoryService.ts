interface IDaoItemsParams {
    search: string
    voteId: number | string
    statusId: number | string
}

interface IDao {
    name: string
    description: string
    address: string
    governance: string
}

interface IDaoItem extends Pick<IDao, 'governance'> {
}

interface INormalizedDaoItem extends Pick<IDao, 'governance'> {
}

interface IProposalItemsParams {
    search: string
    voteId: number | string
    statusId: number | string
}

interface IProposal {
    governance: string
}

interface IProposalItem extends Pick<IDao, 'governance'> {
}

interface INormalizedProposalItem extends Pick<IDao, 'governance'> {
}

export {
    IDaoItemsParams,
    IDaoItem,
    INormalizedDaoItem,
    IDao,
    IProposalItemsParams,
    IProposal,
    IProposalItem,
    INormalizedProposalItem
}
