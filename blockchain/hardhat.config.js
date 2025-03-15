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
  },
  namedAccounts: {
    deployer: {
        default: 0,
    },
  },
};

