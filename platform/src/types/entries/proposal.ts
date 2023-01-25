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

const proposalStatuses = {
    [ProposalStatus.None]: 'Processing',
    [ProposalStatus.Exists]: 'Active',
    [ProposalStatus.Accepted]: 'Accepted',
    [ProposalStatus.Executed]: 'Executed',
    [ProposalStatus.Rejected]: 'Rejected',
};

enum ProposalVoteType {
    None,
    For,
    Against,
    Abstain
}

type ProposalPipeline = [ProposalActionType, string, string, number];

interface IProposalChain {
    status: ProposalStatus
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
    ProposalVoteType,
    proposalStatuses
}
