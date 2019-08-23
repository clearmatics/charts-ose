const Web3 = require('web3')

const rpcURL = process.env.RPC_URL;
console.log(`RPC_URL == ${rpcURL}`);

const rpcAuth = process.env.RPC_AUTH;

import {WebsocketProvider} from 'web3-providers';
const options = {
    timeout: 30000,
    headers: {
        authorization: `Basic  ${rpcAauth}`
    }
};

const wsProvider = new WebsocketProvider(rpcURL, options);
web3 = new Web3(wsProvider);


web3.eth.getBlock('latest').then(console.log)
