module.exports = {
  development: {
    enabled: true,
    networkType: 'custom',
    genesisBlock: 'config/development/genesis.json',
    datadir: '.embark/development/datadir',
    mineWhenNeeded: true,
    nodiscover: true,
    maxpeers: 0,
    rpcHost: 'localhost',
    rpcPort: 8545,
    rpcCorsDomain: 'http://localhost:8000',
    accounts: [
      {
        nodeAccounts: true,
        numAddresses: '1',
        password: 'config/development/password'
      }
    ],
    wsOrigins: 'http://localhost:8000'
  },
  testnet: {
    enabled: true,
    networkType: 'testnet',
    light: true,
    rpcHost: 'localhost',
    rpcPort: 8545,
    rpcCorsDomain: 'http://localhost:8000',
    account: [
      {
        nodeAccounts: true,
        numAddresses: '1',
        password: 'config/testnet/password'
      }
    ]
  },
  livenet: {
    enabled: true,
    networkType: 'livenet',
    light: true,
    rpcHost: 'localhost',
    rpcPort: 8545,
    rpcCorsDomain: 'http://localhost:8000',
    account: [
      {
        nodeAccounts: true,
        numAddresses: '1',
        password: 'config/livenet/password'
      }
    ]
  },
  privatenet: {
    enabled: true,
    networkType: 'custom',
    rpcHost: 'localhost',
    rpcPort: 8545,
    datadir: 'yourdatadir',
    networkId: '123',
    bootnodes: ''
  }
};
