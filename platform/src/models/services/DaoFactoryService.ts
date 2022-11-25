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
}

interface INormalizedDao extends IDao {
}

interface IDaoItem extends IDao {
}

interface INormalizedDaoItem extends IDao {
}

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
    INormalizedDaoItem,
    IDao,
    IProposalItemsParams,
    IProposal,
    IProposalItem,
    INormalizedProposalItem,
    INormalizedDao
}
