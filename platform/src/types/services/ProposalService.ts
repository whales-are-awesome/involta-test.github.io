import { IPaginationParams } from '@/types/api'
import { IDaoPath } from '@/types/services/DaoService'
import { IProposal, IProposalCombined, ProposalPipeline } from '@/types/entries/proposal'

interface IProposalPipelineDefault {
    actionType: ProposalPipeline[0]
    to: ProposalPipeline[1]
    data: ProposalPipeline[2]
    value: ProposalPipeline[3]
    isContract: boolean
    addressOrName: string
}

interface IProposalCombinedDefault extends IProposalCombined {
    createdByName?: string
}

interface IProposalCombinedDefaultNormalizedAsDefault extends Omit<IProposalCombinedDefault, 'pipeline'> {
    createdByAddressOrName: string
    pipeline: IProposalPipelineDefault[]
}

interface IFetchProposalPath extends IDaoPath {
    id: number | string
}

interface IProposalParams {
    id: string
}

interface ICreateProposalOnChainParams {
    contractAddress: string
    actions: Array<{
        actionType: number
        to: string
        data: string
        value: number
    }>
}

interface ICreateProposalOnChainResponse {
    hash: string
}

interface ICreateProposalParams {
    creationTx: string
    name: string
    description: string
}

interface IProposalItem extends IProposal {
}

interface IProposalItemQuery {
    search: string
    voteId: number | string
    statusId: number | string
}

interface INormalizedProposalItem extends IProposal {
}


export {
    IProposal,
    IFetchProposalPath,
    IProposalParams,
    ICreateProposalOnChainParams,
    ICreateProposalOnChainResponse,
    ICreateProposalParams,
    IProposalCombined,
    IProposalCombinedDefault,
    IProposalCombinedDefaultNormalizedAsDefault,

    IProposalItem,
    IProposalItemQuery,
    INormalizedProposalItem,

    IPaginationParams
}
