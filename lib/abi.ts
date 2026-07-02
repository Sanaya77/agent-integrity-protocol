export const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "AgentRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "executionId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "reason",
                "type": "string"
            }
        ],
        "name": "DisputeRaised",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "executionId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "proofHash",
                "type": "string"
            }
        ],
        "name": "ExecutionStored",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "agents",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "agentType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "trustScore",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "stake",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "registered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "disputes",
        "outputs": [
            {
                "internalType": "string",
                "name": "executionId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "reason",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "resolved",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "executions",
        "outputs": [
            {
                "internalType": "string",
                "name": "executionId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "proofHash",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "verified",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDisputes",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "executionId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "reason",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "resolved",
                        "type": "bool"
                    }
                ],
                "internalType": "struct AgentIntegrityProtocol.Dispute[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "executionId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "reason",
                "type": "string"
            }
        ],
        "name": "raiseDispute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "agentType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "trustScore",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "stake",
                "type": "uint256"
            }
        ],
        "name": "registerAgent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "executionId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "proofHash",
                "type": "string"
            }
        ],
        "name": "storeExecution",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];