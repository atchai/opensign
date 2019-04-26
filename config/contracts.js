module.exports = {
  default: {
    deployment: {
      host: 'localhost',
      port: 8545,
      type: 'rpc'
    },
    dappConnection: ['$WEB3', 'ws://localhost:8546', 'http://localhost:8545'],
    gas: 'auto',
    contracts: {
      OpenSign: {
        address: '0x2841ea9a4a69c8ec9b741ab6ab89155b40ee8bbb'
      }
    }
  }
};
