/**
 * Simulation script for CRE workflow
 * This simulates the entire credit scoring flow locally
 */

const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// Mock secrets for simulation
const mockSecrets = {
  BANK_API_KEY: "mock_bank_api_key_12345",
  AI_API_KEY: "mock_ai_api_key_67890",
  PLAID_CLIENT_ID: "mock_plaid_client_id",
  PLAID_SECRET: "mock_plaid_secret",
};

// Mock bank data response
const mockBankData = {
  accounts: [
    {
      account_id: "mock_account_1",
      balances: {
        current: 5420.50,
        available: 5420.50,
      },
    },
  ],
  transactions: [
    { amount: -3500.00, date: "2024-01-15", category: ["Income", "Payroll"] },
    { amount: 1200.00, date: "2024-01-16", category: ["Transfer", "Rent"] },
    { amount: 85.50, date: "2024-01-17", category: ["Food and Drink", "Restaurants"] },
    { amount: -3500.00, date: "2024-02-15", category: ["Income", "Payroll"] },
    { amount: 1200.00, date: "2024-02-16", category: ["Transfer", "Rent"] },
    { amount: 92.30, date: "2024-02-18", category: ["Food and Drink", "Groceries"] },
    // Add more transactions...
  ],
};

// Mock AI response
const mockAIResponse = {
  credit_score: 85,
  justification: "Consistent income with stable payment history and positive cash flow",
  risk_factors: ["Low debt-to-income ratio", "Regular income deposits", "Minimal overdrafts"],
};

async function simulateWorkflow() {
  console.log("🚀 Starting CRE Workflow Simulation\n");

  // Step 1: Parse arguments
  const workflowArgs = {
    userAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    worldIdNullifier: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    accessToken: "mock_access_token",
  };

  console.log("📋 Workflow Arguments:");
  console.log(JSON.stringify(workflowArgs, null, 2));
  console.log();

  // Step 2: Simulate fetching bank data
  console.log("🏦 Fetching private bank data...");
  console.log("✅ Bank data retrieved (PII redacted)");
  console.log(`   - Transactions: ${mockBankData.transactions.length}`);
  console.log(`   - Average Balance: $${mockBankData.accounts[0].balances.current}`);
  console.log();

  // Step 3: Sanitize data
  console.log("🧹 Sanitizing data...");
  const totalIncome = mockBankData.transactions
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const totalExpenses = mockBankData.transactions
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  console.log("✅ Data sanitized");
  console.log(`   - Total Income: $${totalIncome.toFixed(2)}`);
  console.log(`   - Total Expenses: $${totalExpenses.toFixed(2)}`);
  console.log(`   - Net Cash Flow: $${(totalIncome - totalExpenses).toFixed(2)}`);
  console.log();

  // Step 4: AI Analysis
  console.log("🤖 Analyzing with AI...");
  console.log("✅ AI analysis complete");
  console.log(`   - Credit Score: ${mockAIResponse.credit_score}/100`);
  console.log(`   - Justification: ${mockAIResponse.justification}`);
  console.log();

  // Step 5: Encode result
  console.log("📦 Encoding result for on-chain verification...");
  const timestamp = Math.floor(Date.now() / 1000);
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();

  const encoded = abiCoder.encode(
    ["address", "uint256", "uint256", "bytes32", "string"],
    [
      workflowArgs.userAddress,
      mockAIResponse.credit_score,
      timestamp,
      ethers.id(workflowArgs.worldIdNullifier),
      mockAIResponse.justification,
    ]
  );

  console.log("✅ Data encoded");
  console.log(`   - Encoded length: ${encoded.length} bytes`);
  console.log(`   - Encoded data: ${encoded.substring(0, 66)}...`);
  console.log();

  // Step 6: Simulate on-chain submission
  console.log("⛓️  Simulating on-chain submission...");
  console.log("✅ Transaction would be submitted to CrestVault.receiveScore()");
  console.log();

  // Summary
  console.log("📊 Simulation Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`User Address:     ${workflowArgs.userAddress}`);
  console.log(`Credit Score:     ${mockAIResponse.credit_score}/100`);
  console.log(`Timestamp:        ${new Date(timestamp * 1000).toISOString()}`);
  console.log(`World ID:         ${workflowArgs.worldIdNullifier.substring(0, 20)}...`);
  console.log(`Status:           ✅ Ready for deployment`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log();

  // Save simulation results
  const results = {
    workflowArgs,
    bankDataSummary: {
      transactionCount: mockBankData.transactions.length,
      totalIncome,
      totalExpenses,
      netCashFlow: totalIncome - totalExpenses,
      averageBalance: mockBankData.accounts[0].balances.current,
    },
    aiResult: mockAIResponse,
    encodedData: encoded,
    timestamp,
  };

  fs.writeFileSync(
    path.join(__dirname, "../simulation-results.json"),
    JSON.stringify(results, null, 2)
  );

  console.log("💾 Results saved to simulation-results.json");
  console.log("\n✨ Simulation complete!");

  return results;
}

// Run simulation
if (require.main === module) {
  simulateWorkflow()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Simulation failed:", error);
      process.exit(1);
    });
}

module.exports = { simulateWorkflow };
