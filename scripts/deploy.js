const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  console.log("Deploying CrestVault to Tenderly Virtual Testnet...");

  // Get deployer
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy mock USDC for testing
  const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  console.log("Mock USDC deployed to:", await usdc.getAddress());

  // Oracle address (will be the CRE workflow address)
  const oracleAddress = process.env.ORACLE_ADDRESS || deployer.address;

  // Deploy CrestVault
  const CrestVault = await hre.ethers.getContractFactory("CrestVault");
  const vault = await CrestVault.deploy(await usdc.getAddress(), oracleAddress);
  await vault.waitForDeployment();

  const vaultAddress = await vault.getAddress();
  console.log("CrestVault deployed to:", vaultAddress);

  // Add initial liquidity
  const initialLiquidity = hre.ethers.parseUnits("100000", 6); // 100k USDC
  await usdc.mint(deployer.address, initialLiquidity);
  await usdc.approve(vaultAddress, initialLiquidity);
  await vault.addLiquidity(initialLiquidity);
  console.log("Added initial liquidity:", hre.ethers.formatUnits(initialLiquidity, 6), "USDC");

  // Verify on Tenderly
  if (process.env.TENDERLY_PROJECT && process.env.TENDERLY_USERNAME) {
    console.log("Verifying on Tenderly...");
    await hre.tenderly.verify({
      name: "CrestVault",
      address: vaultAddress,
    });
  }

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    vault: vaultAddress,
    usdc: await usdc.getAddress(),
    oracle: oracleAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  console.log("\nDeployment Info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
