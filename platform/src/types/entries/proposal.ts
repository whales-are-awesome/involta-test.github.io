// API

interface IProposalAPI {
    id: number
    name: string
    description: string
    network: string
    daoAddress: string
    creationTx: string
    createdBy: string
}


// CHAIN

enum ProposalActionType {
    Regular,
    App
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

type ProposalPipeline = [ProposalActionType, string, string, number];

interface IProposalChain {
    abstainVp: number
    againstVp: number
    creationBlock: number
    creationTime: number
    forVp: number
    pipeline: ProposalPipeline[]
}

export {
    IProposalAPI,
    ProposalPipeline,
    IProposalChain,
    ProposalStatus,
    ProposalVoteType
}
