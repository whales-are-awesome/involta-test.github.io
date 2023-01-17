export default [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_proposalExpirationTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_quorumRequired",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_parentRegistry",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_governanceInitialSupply",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_governanceTicker",
                "type": "string"
            }
        ],
        "name": "deployDao",
        "outputs": [
            {
                "internalType": "contract DefaultDaoController",
                "name": "daoController",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "governanceFactory",
        "outputs": [
            {
                "internalType": "contract IGovernanceFactory",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_governanceFactory",
                "type": "address"
            }
        ],
        "name": "setGovernanceFactory",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
