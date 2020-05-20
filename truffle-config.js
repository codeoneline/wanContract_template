module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  
  networks: {
   development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
     gas: 10000000,
     gasPrice: 180000000000,
     from:'0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e'
   },
   test: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
    // provider: function() {return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/YOUR-PROJECT-ID");}
   },
   coverage: {
     host: 'localhost',
     network_id: '*',
     port: 6545,
     gas: 0xfffffffffff,
     gasPrice: 0x01
   },
  },

  // contracts_directory: "./contracts",
  // contracts_build_directory: "./build/contracts",
  // migrations_directory: "./migrations",
  plugins: ["solidity-coverage"],
  mocha: { 
    useColors: true,
    enableTimeouts: false
  },
  compilers: {
    solc: {
      version: '0.4.26',
      docker: false,
      // parser: "solcjs",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: 'byzantium'
      }
    }
  }
  
};
