const Web3 = require('web3')

//const rpcURL = 'http://127.0.0.1:8545'
//const rpcURL = 'ws://127.0.0.1:8546'
const rpcURL = 'wss://test.autonity.online:8546'

const web3 = new Web3(rpcURL)

web3.eth.getBlock('latest').then(console.log)
