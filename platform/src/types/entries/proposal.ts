interface IProposal {
    id: number
    name: string
    description: string
    network: string
    daoAddress: string
    creationTx: string
    createdBy: string
}

enum ProposalActionType {
    Regular,
    App
}


interface IProposalPipeline {
    actionType: ProposalActionType
    to: string
    data: string
    value: number
}


interface IProposalOnChain {
    abstainVp: number
    againstVp: number
    creationBlock: number
    creationTime: number
    forVp: number
    pipeline: IProposalPipeline[]
}

enum ProposalStatus {
    None,
    Exists,
    Accepted,
    Executed,
    Rejected
}

enum ProposalVoteType {
    None,
    For,
    Against,
    Abstain
}

interface IProposalCombined extends IProposal, IProposalOnChain {

}

export {
    IProposal,
    IProposalPipeline,
    IProposalOnChain,
    IProposalCombined,
    ProposalStatus,
    ProposalVoteType
}
