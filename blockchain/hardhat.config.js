/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-deploy");


module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
        saveDeployments: true
    },
    localhost: {
        url: "http://127.0.0.1:8545",
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "0x8fc47ff311ff44f65833e86fbee413843757efb6ca0c1106541945a3c00b3bd5"
      ],
    },
  },
  namedAccounts: {
    deployer: {
        default: 0,
    },
  },
};

