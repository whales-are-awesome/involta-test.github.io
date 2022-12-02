export default [
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': '_proposalExpirationTime',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': '_quorumRequired',
                'type': 'uint256'
            },
            {
                'internalType': 'address',
                'name': '_parentRegistry',
                'type': 'address'
            }
        ],
        'name': 'deployDao',
        'outputs': [
            {
                'internalType': 'contract DaoController',
                'name': 'daoController',
                'type': 'address'
            }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
    }
]