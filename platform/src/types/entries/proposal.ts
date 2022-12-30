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


type ProposalPipeline = [ProposalActionType, string, string, number];

interface IProposalOnChain {
    abstainVp: number
    againstVp: number
    creationBlock: number
    creationTime: number
    forVp: number
    pipeline: ProposalPipeline[]
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
    ProposalPipeline,
    IProposalOnChain,
    IProposalCombined,
    ProposalStatus,
    ProposalVoteType
}
