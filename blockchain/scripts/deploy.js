const hre = require("hardhat");

async function main() {

  const VoteBlock = await hre.ethers.getContractFactory("VoteBlock");
  const voteBlock = await VoteBlock.deploy();

  await voteBlock.waitForDeployment();

  console.log("VoteBlock contract deployed to:", voteBlock.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

