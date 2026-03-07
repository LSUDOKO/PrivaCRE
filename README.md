# PrivaCRE — Privacy-Preserving Credit Scoring for DeFi

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![Chainlink](https://img.shields.io/badge/Chainlink-CRE-375BD2)](https://chain.link/chainlink-runtime-environment)
[![Plaid](https://img.shields.io/badge/Plaid-API-00D09C)](https://plaid.com)
[![World ID](https://img.shields.io/badge/World_ID-Verified-000000)](https://worldcoin.org/world-id)
[![Groq](https://img.shields.io/badge/Groq-AI-F55036)](https://groq.com)

**Chainlink Convergence Hackathon 2025 — Privacy Track**

[Live Demo](#-live-demo) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## 🎯 Overview

PrivaCRE is a **Financial Identity Layer** that bridges private Web2 bank data with Web3 DeFi loans using **Chainlink Confidential Compute**, Zero-Knowledge proofs, AI-powered risk analysis, and private transactions.

### The Problem

Traditional DeFi lending requires **150%+ overcollateralization**, locking out the majority of users who have excellent credit but limited crypto assets.

### Our Solution

PrivaCRE enables **undercollateralized loans (110% for prime users)** by proving creditworthiness without ever exposing private financial data on-chain.

**Key Innovation**: Privacy-preserving credit scoring that combines:
- 🔐 Chainlink Confidential Compute for secure data processing
- 🏦 Real bank data via Plaid API
- 🤖 AI-powered risk analysis (Groq Llama 3.3 70B)
- 🌐 World ID for Sybil resistance
- 🔒 Zero-knowledge proofs for privacy

---

## 🏗️ Architecture


### System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE                                 │
│  Next.js 15 + React 19 + TypeScript + Tailwind CSS + Framer Motion     │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼────────┐       ┌───────▼────────┐
        │  World ID      │       │  RainbowKit    │
        │  Verification  │       │  Wallet        │
        │  (Sybil Guard) │       │  Connection    │
        └───────┬────────┘       └───────┬────────┘
                │                         │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │   Plaid Link Widget     │
                │   (Bank Connection)     │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────────────────────────────┐
                │         BACKEND API ROUTES                      │
                │  /api/plaid/create-link-token                   │
                │  /api/plaid/exchange                            │
                │  /api/worldid/verify                            │
                │  /api/cre (Workflow Trigger)                    │
                └────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌──────▼──────┐
│  Plaid API     │  │  Groq AI API    │  │  World ID   │
│  (Bank Data)   │  │  (Llama 3.3)    │  │  (Identity) │
└───────┬────────┘  └────────┬────────┘  └──────┬──────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                ┌────────────▼────────────────────────────────────┐
                │    CHAINLINK CRE WORKFLOW (Privacy Layer)       │
                │                                                  │
                │  Phase 1: Confidential HTTP                     │
                │  ├─ Fetch bank data (Plaid)                     │
                │  └─ API keys never exposed                      │
                │                                                  │
                │  Phase 2: PII Sanitization                      │
                │  ├─ Strip names, addresses, SSNs                │
                │  └─ Extract financial features only             │
                │                                                  │
                │  Phase 3: AI Risk Analysis                      │
                │  ├─ Send sanitized data to Groq                 │
                │  └─ Calculate credit score (1-100)              │
                │                                                  │
                │  Phase 4: Encrypted Settlement                  │
                │  ├─ Encrypt score with commitments              │
                │  └─ Submit to smart contract                    │
                └────────────┬────────────────────────────────────┘
                             │
                ┌────────────▼────────────────────────────────────┐
                │         SMART CONTRACTS                         │
                │         (Tenderly Virtual Sepolia)              │
                │                                                  │
                │  ┌──────────────────────────────────────┐       │
                │  │  CrestVault (Main Lending Vault)     │       │
                │  │  0x49BdEEcB489E037C0f6928dEe6a043908b8d8877│       │
                │  │  - Credit-gated lending               │       │
                │  │  - Dynamic collateral ratios          │       │
                │  │  - Chainlink Price Feed integration   │       │
                │  └──────────────────────────────────────┘       │
                │                                                  │
                │  ┌──────────────────────────────────────┐       │
                │  │  PrivateVault (Privacy Features)     │       │
                │  │  - Commitment-based storage           │       │
                │  │  - Encrypted credit scores            │       │
                │  │  - Zero-knowledge proofs              │       │
                │  └──────────────────────────────────────┘       │
                │                                                  │
                │  ┌──────────────────────────────────────┐       │
                │  │  MockUSDC (Test Stablecoin)          │       │
                │  │  0x5432bed5E495f625640bc6210087D07C14DF5FE3│       │
                │  └──────────────────────────────────────┘       │
                │                                                  │
                │  ┌──────────────────────────────────────┐       │
                │  │  Chainlink ETH/USD Price Feed        │       │
                │  │  0xb8d323B1F3524d2e634B9Fa2537425AD39712140│       │
                │  └──────────────────────────────────────┘       │
                └──────────────────────────────────────────────────┘
```


### Data Flow

```
1. USER AUTHENTICATION
   └─> Connect Wallet (RainbowKit)
   └─> Verify Identity (World ID Orb)
   └─> Link Bank Account (Plaid)

2. CONFIDENTIAL DATA BRIDGE
   └─> Plaid Link opens in secure iframe
   └─> User authenticates with bank
   └─> Public token exchanged for access token
   └─> Access token stored in CRE Secrets Manager

3. CRE WORKFLOW EXECUTION
   └─> Trigger: User requests credit score
   └─> Phase 1: Fetch bank data via Confidential HTTP
       ├─ Retrieve access token from CRE Secrets
       ├─ Call Plaid API (24 transactions fetched)
       └─ Data encrypted in transit
   └─> Phase 2: Sanitize PII in WASM sandbox
       ├─ Remove: names, addresses, account numbers, SSNs
       ├─ Extract: income, expenses, balance, patterns
       └─> Only aggregated metrics retained
   └─> Phase 3: AI Risk Analysis
       ├─ Send sanitized data to Groq AI
       ├─ Llama 3.3 70B analyzes financial behavior
       ├─ Calculate: Debt-to-income, cash flow, stability
       └─ Return: Credit score (1-100) + justification
   └─> Phase 4: On-Chain Settlement
       ├─ Encrypt score with commitment scheme
       ├─ Generate zero-knowledge proof
       ├─ Submit to CrestVault contract
       └─ Emit ScoreUpdated event

4. LENDING OPERATIONS
   └─> User requests loan
   └─> Contract checks credit score
   └─> Calculate collateral requirement:
       ├─ Score 80+: 110% collateral (Prime)
       ├─ Score 50-79: 150% collateral (Standard)
       └─ Score <50: Not eligible
   └─> Issue loan if collateral sufficient
   └─> Track repayment on-chain
```

---

## 🔐 Privacy Features (Track Requirements)

### 1. Chainlink Confidential Compute ✅

**Implementation**: `PrivaCRE/my-workflow/main-confidential.ts`

- **Confidential HTTP**: API keys stored in CRE Secrets Manager, retrieved via `runtime.getSecret()`
- **Encrypted Storage**: Credit scores encrypted before on-chain storage using AES-256-GCM
- **Zero-Knowledge Proofs**: Cryptographic commitments prove eligibility without revealing data
- **PII Sanitization**: Personal data stripped in WASM sandbox before AI analysis

**Evidence**:
```typescript
// Secrets never exposed
const plaidSecret = await runtime.getSecret({ id: 'PLAID_SECRET' }).result();
const aiKey = await runtime.getSecret({ id: 'AI_API_KEY' }).result();

// Only sanitized features sent to AI
const features = extractFeatures(accounts, transactions);
// Returns: { averageBalance, monthlyIncome, debtToIncome, ... }
// Excludes: names, addresses, account numbers, SSNs
```

### 2. Private Transactions ✅

**Implementation**: `contracts/PrivateVault.sol`

- **Commitment-Based Storage**: Loan amounts hidden via `keccak256(amount + salt)`
- **Encrypted Transaction History**: All transactions logged with encrypted details
- **Nullifier Tracking**: Prevents double-spending without exposing transaction details
- **Zero-Knowledge Verification**: Prove loan eligibility without revealing score

**Evidence**:
```solidity
struct PrivateLoan {
    bytes32 loanCommitment;        // Hash of (principal + collateral + salt)
    bytes32 collateralCommitment;  // Hash of collateral amount
    bytes encryptedDetails;        // Encrypted loan details
}
```

### 3. Data Sanitization ✅

**Implementation**: `scripts/simulate-workflow.js` + `PrivaCRE/my-workflow/main.ts`

**Removed Before AI Analysis**:
- ❌ Account holder names
- ❌ Account numbers
- ❌ Addresses
- ❌ Social Security Numbers
- ❌ Transaction merchant details

**Retained for Analysis**:
- ✅ Transaction amounts (aggregated)
- ✅ Transaction dates
- ✅ Category labels
- ✅ Balance information
- ✅ Calculated metrics (DTI, cash flow)

### 4. Zero-Knowledge Identity ✅

**Implementation**: `src/components/WorldIDVerification.tsx`

- **World ID Integration**: Orb-level verification ensures one-human-one-score
- **Nullifier Hash**: Unique identifier prevents Sybil attacks
- **Privacy-Preserving**: Identity verified without revealing personal information

---

## 📊 Credit Scoring Methodology

### How Scores Are Calculated


**Step 1: Fetch Real Bank Data**
```javascript
// Plaid API returns 24 transactions
const response = await client.transactionsSync({ access_token });
// Real data: income, expenses, balance, transaction history
```

**Step 2: Calculate Financial Metrics**
```javascript
const totalIncome = transactions.filter(tx => tx.amount < 0).reduce(...);
const totalExpenses = transactions.filter(tx => tx.amount > 0).reduce(...);
const currentBalance = accounts[0].balances.current;
```

**Step 3: AI Analysis (Groq Llama 3.3 70B)**
```javascript
// Send to Groq AI
const prompt = `Analyze: Income ${totalIncome}, Expenses ${totalExpenses}, Balance ${currentBalance}`;
const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "system", content: "You are a credit underwriter..." }]
});
// Returns: { credit_score: 76, justification: "...", risk_factors: [...] }
```

**Step 4: Dynamic Scoring**
- AI analyzes debt-to-income ratio (40% weight)
- Evaluates cash flow stability (30% weight)
- Considers balance health (20% weight)
- Assesses spending volatility (10% weight)
- Adds small jitter (-3 to +3) for realism

**Result**: Credit Score 1-100 (e.g., 76/100)

### Loan Tiers

| Tier | Score Range | Collateral | APR | Max Loan |
|------|-------------|------------|-----|----------|
| **Prime** | 80-100 | 110% | 4.5% | $15,000 |
| **Standard** | 50-79 | 150% | 6.8% | $10,000 |
| **Insufficient** | 1-49 | N/A | N/A | Not Eligible |

---

## 🚀 Live Demo

### Deployed Contracts (Tenderly Virtual Sepolia)

| Contract | Address | Explorer Link |
|----------|---------|---------------|
| **CrestVault** | `0x49BdEEcB489E037C0f6928dEe6a043908b8d8877` | [View on Tenderly](https://dashboard.tenderly.co/explorer/vnet/29209eb9-c1b7-42a0-97d9-1ee5be8c8eb9/address/0x49BdEEcB489E037C0f6928dEe6a043908b8d8877) |
| **MockUSDC** | `0x5432bed5E495f625640bc6210087D07C14DF5FE3` | [View on Tenderly](https://dashboard.tenderly.co/explorer/vnet/29209eb9-c1b7-42a0-97d9-1ee5be8c8eb9/address/0x5432bed5E495f625640bc6210087D07C14DF5FE3) |
| **Price Feed** | `0xb8d323B1F3524d2e634B9Fa2537425AD39712140` | [View on Tenderly](https://dashboard.tenderly.co/explorer/vnet/29209eb9-c1b7-42a0-97d9-1ee5be8c8eb9/address/0xb8d323B1F3524d2e634B9Fa2537425AD39712140) |
| **Oracle** | `0xAd0799D4D6564c945C448D8BcFA890c41e111A98` | [View on Tenderly](https://dashboard.tenderly.co/explorer/vnet/29209eb9-c1b7-42a0-97d9-1ee5be8c8eb9/address/0xAd0799D4D6564c945C448D8BcFA890c41e111A98) |

**Network**: Tenderly Virtual Sepolia  
**RPC URL**: `https://virtual.sepolia.eu.rpc.tenderly.co/7611135a-8515-41d7-8146-9390be57f949`  
**Chain ID**: 11155111  
**Deployed**: March 7, 2026

### Recent Transactions

View live transactions on [Tenderly Dashboard](https://dashboard.tenderly.co/LSUDOKO/project/testnet/29209eb9-c1b7-42a0-97d9-1ee5be8c8eb9)

**Example Transactions**:
- Score Update: [0xb44f1b2...](https://dashboard.tenderly.co/LSUDOKO/project/testnet/29209eb9-c1b7-42a0-97d9-1ee5be8c8eb9/tx/0xb44f1b286c7ad12dd7440cffbeddfd6fa3d9717bee4b255a51ff562d4fa0618b)
- Loan Issuance: View on lending page
- Repayment: Tracked on-chain

---

## 🎯 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/PrivaCRE.git
cd PrivaCRE

# Install dependencies
npm install

# Install CRE workflow dependencies
cd PrivaCRE/my-workflow && npm install && cd ../..
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# Required:
# - PLAID_CLIENT_ID
# - PLAID_SECRET
# - GROQ_API_KEY
# - NEXT_PUBLIC_WORLD_ID_APP_ID
# - RPC_URL_SEPOLIA (Tenderly)
```

### Run CRE Workflow Simulation

The simulation demonstrates the full Privacy Track workflow with REAL data:

**Method 1: Using npm (Recommended)**
```bash
npm run simulate
```

**Method 2: Using helper script**
```bash
./scripts/run-cre-workflow.sh
```

**Method 3: Direct CRE CLI**
```bash
cd PrivaCRE/my-workflow
cre workflow simulate --target staging-settings --project-root .. .
```

**Expected Output**:
```
🚀 Starting CRE Workflow Simulation

✅ Found Plaid access token in secrets.yaml
🔗 Fetching REAL data from Plaid...
✅ Retrieved 24 transactions from Plaid

🤖 Analyzing with Groq AI (llama-3.3-70b-versatile)...
✅ Groq AI analysis complete
   - Credit Score: 76/100
   - Justification: The applicant has a moderate credit score...

📊 Results saved to simulation-results.json
```

### Deploy Smart Contracts

```bash
# Compile contracts
npm run compile

# Deploy to Tenderly Virtual Testnet
npm run deploy:tenderly

# Deploy to Arbitrum Sepolia
npm run deploy:testnet
```

### Run Frontend

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🧪 Testing

### Test CRE Workflow
```bash
npm run simulate
```

### Test End-to-End Flow
```bash
./test-e2e.sh
```

### Test Plaid Integration
```bash
node test-plaid-setup.js
```

### Test Smart Contracts
```bash
npm run test:contracts
```

---

## 📁 Project Structure


```
PrivaCRE/
├── PrivaCRE/my-workflow/          # 🔗 Chainlink CRE Workflow
│   ├── main.ts                    # Main workflow (Confidential HTTP + AI)
│   ├── main-confidential.ts       # Privacy-enhanced workflow
│   ├── workflow.yaml              # CRE workflow configuration
│   ├── config.staging.json        # Staging config (Plaid sandbox + Groq)
│   └── config.production.json     # Production config
│
├── contracts/                     # Solidity Smart Contracts
│   ├── CrestVault.sol             # 🔗 Credit-gated lending vault
│   ├── PrivateVault.sol           # 🔐 Privacy-preserving vault
│   ├── MockUSDC.sol               # Test stablecoin
│   └── MockPriceFeed.sol          # Chainlink Price Feed mock
│
├── scripts/                       # Deployment & Simulation
│   ├── deploy.js                  # Contract deployment
│   ├── simulate-workflow.js       # 🔗 CRE local simulation
│   ├── cre-secret-manager.js      # CRE secret management
│   └── run-cre-workflow.sh        # CRE workflow execution
│
├── src/                           # Next.js Frontend
│   ├── app/
│   │   ├── auth/page.tsx          # Wallet + World ID verification
│   │   ├── bridge/page.tsx        # Plaid bank connection
│   │   ├── orchestration/page.tsx # Real-time CRE pipeline
│   │   ├── lending/page.tsx       # DeFi lending vault UI
│   │   ├── dashboard/page.tsx     # Credit score dashboard
│   │   └── api/
│   │       ├── cre/route.ts       # 🔗 CRE workflow trigger
│   │       ├── plaid/             # Plaid API routes
│   │       └── worldid/           # World ID verification
│   │
│   ├── hooks/
│   │   ├── useOrchestration.ts    # CRE pipeline state
│   │   ├── usePlaidLink.ts        # Plaid integration
│   │   └── useWorldID.ts          # World ID integration
│   │
│   └── components/
│       ├── WorldIDVerification.tsx # World ID widget
│       └── ui/                     # UI components
│
└── scoring_methodology.md         # Credit scoring algorithm
```

---

## 🔗 Chainlink Integrations

### Files Using Chainlink

| File | Chainlink Feature | Description |
|------|-------------------|-------------|
| [`PrivaCRE/my-workflow/main-confidential.ts`](./PrivaCRE/my-workflow/main-confidential.ts) | **🔐 Confidential Compute** | Full privacy-preserving pipeline with encrypted storage, commitments, and ZK proofs |
| [`PrivaCRE/my-workflow/main.ts`](./PrivaCRE/my-workflow/main.ts) | **CRE Workflow** | Uses `runtime.getSecret` for Confidential HTTP to fetch Plaid data |
| [`contracts/CrestVault.sol`](./contracts/CrestVault.sol) | **Price Feed** | Integrates Chainlink ETH/USD Price Feed for collateral calculations |
| [`contracts/PrivateVault.sol`](./contracts/PrivateVault.sol) | **Privacy Features** | Receives encrypted scores from Confidential Compute |
| [`scripts/simulate-workflow.js`](./scripts/simulate-workflow.js) | **CRE Simulation** | Local simulation of CRE workflow |
| [`src/app/api/cre/route.ts`](./src/app/api/cre/route.ts) | **API Bridge** | Triggers CRE workflow execution |

### Chainlink Price Feed Integration

```solidity
// contracts/CrestVault.sol
AggregatorV3Interface public immutable priceFeed;

function getLatestPrice() public view returns (uint256) {
    (, int256 price, , uint256 updatedAt, ) = priceFeed.latestRoundData();
    require(price > 0, "Invalid price");
    require(updatedAt > block.timestamp - 365 days, "Stale price");
    return uint256(price);
}

function calculateRequiredCollateral(address user, uint256 amount) 
    public view returns (uint256) 
{
    uint256 ethPrice = getLatestPrice(); // From Chainlink
    uint256 collateralRatio = getCreditTier(user);
    return (amount * collateralRatio * 1e18) / (ethPrice * 100);
}
```

**Price Feed Address**: `0xb8d323B1F3524d2e634B9Fa2537425AD39712140`  
**Network**: Tenderly Virtual Sepolia  
**Pair**: ETH/USD

---

## 🌐 External Integrations

### Plaid (Bank Data)

**Purpose**: Fetch real bank transactions for credit analysis  
**Environment**: Sandbox  
**API**: `https://sandbox.plaid.com`  
**Integration**: `src/hooks/usePlaidLink.ts`

**Test Credentials**:
- Username: `user_good`
- Password: `pass_good`

**Data Fetched**:
- 24 transactions (last 90 days)
- Account balances
- Transaction categories
- Income/expense patterns

### Groq AI (Credit Analysis)

**Purpose**: AI-powered credit risk assessment  
**Model**: Llama 3.3 70B Versatile  
**API**: `https://api.groq.com/openai/v1/chat/completions`  
**Integration**: `scripts/simulate-workflow.js`

**Analysis**:
- Debt-to-income ratio
- Cash flow stability
- Balance health
- Spending volatility

### World ID (Identity Verification)

**Purpose**: Sybil-resistant identity verification  
**Level**: Orb (highest security)  
**Integration**: `src/components/WorldIDVerification.tsx`  
**App ID**: `app_7141eab28d3662245856d528b69d89e4`

**Features**:
- One-human-one-score
- Nullifier hash mapping
- Privacy-preserving verification

---

## 📊 Performance Metrics

### CRE Workflow

- **Execution Time**: 5-8 seconds
- **Data Transfer**: ~2.4KB
- **API Calls**: 2 (Plaid + Groq)
- **Gas Cost**: 0 (off-chain computation)

### Smart Contracts

- **receiveScore()**: ~80,000 gas
- **requestLoan()**: ~120,000 gas
- **repayLoan()**: ~90,000 gas

### Frontend

- **Initial Load**: <2s
- **Animation Duration**: 2-3s
- **Score Calculation**: 5-8s
- **Total User Flow**: ~10-15s

---

## 🔒 Security

### Smart Contract Security

- ✅ OpenZeppelin battle-tested libraries
- ✅ Role-based access control (AccessControl)
- ✅ Reentrancy protection (ReentrancyGuard)
- ✅ Input validation on all functions
- ✅ Event emissions for state changes
- ✅ Gas-optimized operations

### Secrets Management

- ✅ `.env` in `.gitignore`
- ✅ `secrets.yaml` in `.gitignore`
- ✅ API keys not in frontend code
- ✅ CRE Secrets Manager for production
- ✅ No secrets in git history

### Privacy Guarantees

- ✅ API keys never exposed (Confidential HTTP)
- ✅ PII stripped before AI analysis
- ✅ Credit scores encrypted on-chain
- ✅ Loan amounts hidden via commitments
- ✅ Zero-knowledge proofs for verification

---

## 📝 Environment Variables


### Required Variables

```bash
# Blockchain
RPC_URL_SEPOLIA=https://virtual.sepolia.eu.rpc.tenderly.co/7611135a-8515-41d7-8146-9390be57f949
PRIVATE_KEY=your_deployer_private_key

# Plaid (Bank Data)
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_sandbox_secret
PLAID_ENV=sandbox

# Groq AI (Credit Analysis)
GROQ_API_KEY=your_groq_api_key

# World ID (Identity)
NEXT_PUBLIC_WORLD_ID_APP_ID=app_7141eab28d3662245856d528b69d89e4

# Tenderly
TENDERLY_PROJECT=your_tenderly_project
TENDERLY_USERNAME=your_tenderly_username
TENDERLY_ACCESS_KEY=your_tenderly_access_key
```

See [`.env.example`](./.env.example) for complete configuration.

---

## 🏆 Hackathon Submission

### Privacy Track Requirements

| Requirement | Status | Evidence |
|-------------|--------|----------|
| **CRE Workflow Built** | ✅ | `PrivaCRE/my-workflow/main.ts` (1,000+ lines) |
| **Confidential HTTP** | ✅ | `runtime.getSecret()` + `sendRequest()` |
| **Blockchain Integration** | ✅ | Deployed to Tenderly Virtual Sepolia |
| **External API Integration** | ✅ | Plaid API + Groq AI |
| **API Credentials Protected** | ✅ | CRE Secrets Manager + `.env` |
| **Sensitive Data Protected** | ✅ | PII sanitization + encryption |
| **Simulation Demonstrated** | ✅ | `npm run simulate` works |
| **Public Source Code** | ✅ | GitHub repository |
| **README with Chainlink Links** | ✅ | This document |

### Demo Video

[🎬 Watch Demo Video](#) *(Coming soon)*

**Demo Script**:
1. Connect wallet (RainbowKit)
2. Verify identity (World ID)
3. Link bank account (Plaid)
4. Run CRE orchestration
5. View credit score
6. Request loan
7. Repay loan

**Duration**: 3-5 minutes

---

## 📚 Documentation

### Core Documentation

- [**CREDIT_SCORE_CALCULATION_EXPLAINED.md**](./CREDIT_SCORE_CALCULATION_EXPLAINED.md) - How credit scores are calculated
- [**PRIVACY_TRACK_IMPLEMENTATION.md**](./PRIVACY_TRACK_IMPLEMENTATION.md) - Privacy features detailed
- [**CRE_FINAL_STATUS.md**](./CRE_FINAL_STATUS.md) - CRE integration status
- [**COMPREHENSIVE_AUDIT_REPORT.md**](./COMPREHENSIVE_AUDIT_REPORT.md) - Full project audit

### Integration Guides

- [**PLAID_INTEGRATION_GUIDE.md**](./PLAID_INTEGRATION_GUIDE.md) - Plaid setup
- [**WORLD_ID_INTEGRATION_COMPLETE.md**](./WORLD_ID_INTEGRATION_COMPLETE.md) - World ID setup
- [**CRE_CLI_INTEGRATION_COMPLETE.md**](./CRE_CLI_INTEGRATION_COMPLETE.md) - CRE CLI usage

### Quick References

- [**QUICK_REFERENCE.md**](./QUICK_REFERENCE.md) - Quick commands
- [**FINAL_SUBMISSION_CHECKLIST.md**](./FINAL_SUBMISSION_CHECKLIST.md) - Submission checklist
- [**scoring_methodology.md**](./scoring_methodology.md) - Scoring algorithm

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.2.0
- **UI Library**: React 19.0.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 12 + GSAP 3.12
- **Web3**: Wagmi 3.5 + RainbowKit 2.2
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **API Routes**: Next.js API Routes
- **Database**: On-chain (smart contracts)

### Blockchain
- **Network**: Tenderly Virtual Sepolia
- **Smart Contracts**: Solidity 0.8.20
- **Libraries**: OpenZeppelin 5.0
- **Development**: Hardhat 2.19
- **Testing**: Chai 4.5

### Chainlink
- **CRE SDK**: @chainlink/cre-sdk 1.0.9
- **Price Feeds**: Chainlink ETH/USD
- **Confidential Compute**: CRE Workflow

### External APIs
- **Bank Data**: Plaid API (Sandbox)
- **AI Analysis**: Groq (Llama 3.3 70B)
- **Identity**: World ID (Orb level)

---

## 🚀 Deployment

### Tenderly Virtual Testnet

**Network Details**:
- **Name**: Tenderly Virtual Sepolia
- **RPC**: `https://virtual.sepolia.eu.rpc.tenderly.co/7611135a-8515-41d7-8146-9390be57f949`
- **Chain ID**: 11155111
- **Explorer**: [Tenderly Dashboard](https://dashboard.tenderly.co/LSUDOKO/project/testnet/29209eb9-c1b7-42a0-97d9-1ee5be8c8eb9)

**Deployed Contracts**:
```json
{
  "network": "tenderly",
  "vault": "0x49BdEEcB489E037C0f6928dEe6a043908b8d8877",
  "usdc": "0x5432bed5E495f625640bc6210087D07C14DF5FE3",
  "oracle": "0xAd0799D4D6564c945C448D8BcFA890c41e111A98",
  "priceFeed": "0xb8d323B1F3524d2e634B9Fa2537425AD39712140",
  "deployer": "0xAd0799D4D6564c945C448D8BcFA890c41e111A98",
  "timestamp": "2026-03-07T06:46:56.656Z"
}
```

### Frontend Deployment

**Recommended**: Vercel

```bash
# Deploy to Vercel
vercel deploy

# Set environment variables in Vercel dashboard
# - PLAID_CLIENT_ID
# - PLAID_SECRET
# - GROQ_API_KEY
# - NEXT_PUBLIC_WORLD_ID_APP_ID
# - RPC_URL_SEPOLIA
```

---

## 🤝 Contributing

This is a hackathon project. Contributions welcome after the hackathon!

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Chainlink** — CRE, Confidential HTTP, Price Feeds
- **World ID / Worldcoin** — Sybil-resistant identity verification
- **Groq** — High-performance Llama 3.3 inference
- **Plaid** — Secure bank data connectivity
- **Tenderly** — Virtual testnet and debugging tools
- **OpenZeppelin** — Secure smart contract libraries

---

## 📞 Contact

**Team**: PrivaCRE  
**Hackathon**: Chainlink Convergence 2025  
**Track**: Privacy Track  
**GitHub**: [github.com/yourusername/PrivaCRE](https://github.com/yourusername/PrivaCRE)

---

<div align="center">

**Built with ❤️ for Chainlink Convergence Hackathon 2025**

[⬆ Back to Top](#privacre--privacy-preserving-credit-scoring-for-defi)

</div>
