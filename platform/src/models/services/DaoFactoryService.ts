interface IDaoItemsParams {
    search: string
    voteId: number | string
    statusId: number | string
}

interface IDaoResponse {
    governance: string
}

interface IDaoItemResponse extends Pick<IDaoResponse, 'governance'> {
}

interface INormalizedDaoItem extends Pick<IDaoResponse, 'governance'> {
}

interface IProposalItemsParams {
    search: string
    voteId: number | string
    statusId: number | string
}

interface IProposalResponse {
    governance: string
}

interface IProposalItemResponse extends Pick<IDaoResponse, 'governance'> {
}

interface INormalizedProposalItem extends Pick<IDaoResponse, 'governance'> {
}

export {
    IDaoItemsParams,
    IDaoItemResponse,
    INormalizedDaoItem,
    IDaoResponse,
    IProposalItemsParams,
    IProposalResponse,
    IProposalItemResponse,
    INormalizedProposalItem
}
