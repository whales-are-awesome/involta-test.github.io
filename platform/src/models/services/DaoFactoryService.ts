interface IFetchDaoItemsParams {
    search: string
    voteId: number | string
    statusId: number | string
}

interface IFetchDaoResponse {
    governance: string
}

interface IFetchDaoItemsResponse extends Pick<IFetchDaoResponse, 'governance'> {
}

export {
    IFetchDaoItemsParams,
    IFetchDaoItemsResponse,
    IFetchDaoResponse
}
