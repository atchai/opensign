module.exports = {
  default: {
    enabled: true,
    ipfs_bin: 'ipfs',
    provider: 'ipfs',
    available_providers: ['ipfs'],
    upload: {
      host: 'ipfs.infura.io',
      protocol: 'https',
      port: 5001,
      getUrl: 'https://ipfs.infura.io/ipfs/'
    },
    dappConnection: [
      {
        provider: 'ipfs',
        host: 'localhost',
        port: 5001,
        getUrl: 'http://localhost:8080/ipfs/'
      }
    ]
  },
  development: {
    enabled: true,
    provider: 'ipfs',
    host: 'localhost',
    port: 5001
  }
};
