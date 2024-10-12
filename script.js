// Web3 初始化
if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    
    // 请求用户钱包连接
    document.getElementById('connectButton').onclick = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        getTokenName(); // 获取代币名称
    };
}

// Jobe 合约的 ABI
const jobeABI = [
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "stringParams",
                "type": "string[]"
            },
            {
                "internalType": "address[]",
                "name": "addressParams",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "numberParams",
                "type": "uint256[]"
            },
            {
                "internalType": "bool[]",
                "name": "boolParams",
                "type": "bool[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
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
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    // ... 其他 ABI 项 ...
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

// 合约地址
const jobeContractAddress = "0x9351580bB69A9A6881f35C6ee365aEf8E3Ff1788"; // 确保此地址是正确的

// 创建合约实例
const jobeContract = new web3.eth.Contract(jobeABI, jobeContractAddress);

// 示例函数：获取代币名称
async function getTokenName() {
    const name = await jobeContract.methods.name().call();
    document.getElementById('tokenName').innerText = "代币名称: " + name;
}