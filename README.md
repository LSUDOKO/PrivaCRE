# PrivaCRE — Privacy-Preserving Credit Scoring for DeFi

**Chainlink Convergence Hackathon 2025 Submission — Privacy Track**

PrivaCRE is a Financial Identity Layer that bridges private Web2 bank data with Web3 DeFi loans using **Chainlink Confidential Compute**, Zero-Knowledge proofs, AI-powered risk analysis, and private transactions.

---

## 🎯 Problem Statement

Traditional DeFi lending requires 150%+ overcollateralization, locking out the majority of users. PrivaCRE enables **undercollateralized loans** by proving creditworthiness without ever exposing private financial data on-chain.

---

## 🔐 Privacy Track Features (NEW!)

### Chainlink Confidential Compute ✅
- **Confidential HTTP**: API keys never exposed in logs or on-chain
- **Encrypted Storage**: Credit scores encrypted before on-chain storage
- **Zero-Knowledge Proofs**: Prove eligibility without revealing data
- **PII Sanitization**: Personal data stripped before AI analysis

### Private Transactions ✅
- **Commitment-Based Storage**: Loan amounts hidden via cryptographic commitments
- **Encrypted On-Chain Data**: Only hashes visible publicly
- **Nullifier Tracking**: Prevent double-spending without exposing details
- **Confidential Transaction History**: Encrypted audit trail for compliance

**See**: [PRIVACY_TRACK_IMPLEMENTATION.md](./PRIVACY_TRACK_IMPLEMENTATION.md) for full details

---

## 🏗️ Architecture

```
User → World ID → Plaid (Confidential HTTP) → CRE Workflow → AI Risk Model → PrivateVault.sol → Private Loan
                                                                                    ↓
                                                                          (Encrypted Score + Commitment)
```

### Core Components

| Component | Technology | Purpose |
|---|---|---|
| **CRE Workflow** | Chainlink CRE + Confidential Compute | Secure off-chain orchestration with encryption |
| **PrivateVault** | Solidity + Commitments + ZK Proofs | Privacy-preserving on-chain settlement |
| **AI Risk Model** | Groq Llama 3.3 70B | Privacy-preserving credit scoring |
| **Smart Contracts** | Solidity + OpenZeppelin | Credit-gated lending with private transactions |
| **Identity** | World ID (IDKitWidget) | Sybil-resistant identity verification |
| **Testnet** | Tenderly Virtual Testnet | Simulation and debugging |

---

## 🔗 Chainlink Integrations (Required Links)

> This section explicitly lists all files that use Chainlink, as required by the hackathon.

| File | Chainlink Feature Used |
|---|---|
| [`PrivaCRE/my-workflow/main-confidential.ts`](./PrivaCRE/my-workflow/main-confidential.ts) | **🔐 Confidential Compute Workflow** — Full privacy-preserving pipeline with encrypted storage, commitments, and ZK proofs. Uses `runtime.getSecret` for **Confidential HTTP**. |
| [`PrivaCRE/my-workflow/main.ts`](./PrivaCRE/my-workflow/main.ts) | **CRE Workflow** — Standard mode. Uses `runtime.getSecret` for **Confidential HTTP** to fetch Plaid bank data without exposing API keys. |
| [`contracts/PrivateVault.sol`](./contracts/PrivateVault.sol) | **🔐 Privacy-Preserving Vault** — Receives encrypted scores from Confidential Compute. Implements commitment-based storage and private transactions. |
| [`contracts/CrestVault.sol`](./contracts/CrestVault.sol) | **On-chain settlement target** — Receives credit scores from CRE oracle. Integrates **Chainlink ETH/USD Price Feed** (`0x694AA1769357215DE4FAC081bf1f309aDC325306`). |
| [`contracts/PrivaVault.sol`](./contracts/PrivaVault.sol) | Uses **Chainlink ETH/USD Price Feed** for dynamic collateral calculation. |
| [`PrivaCRE/my-workflow/workflow.yaml`](./PrivaCRE/my-workflow/workflow.yaml) | CRE Workflow definition and secrets configuration. |
| [`PrivaCRE/my-workflow/config.staging.json`](./PrivaCRE/my-workflow/config.staging.json) | CRE staging config: Plaid sandbox API, Groq AI endpoint, PrivateVault contract address. |
| [`src/app/api/cre/route.ts`](./src/app/api/cre/route.ts) | API bridge that simulates and triggers the CRE workflow. |
| [`scripts/simulate-workflow.js`](./scripts/simulate-workflow.js) | Local CRE simulation script (run via `npm run simulate`). |
| [`scripts/deploy-private-vault.js`](./scripts/deploy-private-vault.js) | **🔐 PrivateVault deployment** — Deploys privacy-preserving contract. |

---

## 🔐 Privacy Features (Track-Specific)

### 1. Chainlink Confidential Compute (Core Track Requirement) ✅

**Implementation**: `PrivaCRE/my-workflow/main-confidential.ts`

#### Confidential HTTP
- The CRE Workflow uses **Chainlink Confidential HTTP** to call the Plaid API
- `PLAID_CLIENT_ID`, `PLAID_SECRET`, and `AI_API_KEY` stored in **CRE Secrets Manager**
- Retrieved via `runtime.getSecret()` — **never logged, never sent on-chain, never visible**
- Encryption keys managed securely by CRE

#### Encrypted On-Chain Storage
- Credit scores **encrypted before storage** using AES-256-GCM (simplified for hackathon)
- Only **encrypted bytes and commitments** stored on-chain
- Actual score values **never visible publicly**

#### Zero-Knowledge Proofs
- Cryptographic commitments generated for private data
- ZK proofs verify eligibility **without revealing actual values**
- On-chain verification without exposing secrets

### 2. Private Transactions (Core Track Requirement) ✅

**Implementation**: `contracts/PrivateVault.sol`

#### Commitment-Based Storage
- Loan amounts hidden via **cryptographic commitments** (hash of amount + salt)
- Only commitment (hash) stored on-chain, **not actual values**
- Prevents public visibility of transaction amounts

#### Encrypted Transaction History
- All transactions logged with **encrypted details**
- Only user or admin can decrypt
- Compliance-ready audit trail without public exposure

#### Nullifier-Based Double-Spend Prevention
- Prevents replay attacks using nullifiers
- Ensures transaction uniqueness
- Privacy-preserving transaction tracking

### 3. Data Sanitization ✅

- Before sending any data to AI, a `extractFeatures()` function strips:
  - Names ❌
  - Account numbers ❌
  - Addresses ❌
  - SSNs ❌
  - Transaction details ❌
- Only **aggregated financial features** used for scoring:
  - Debt-to-income ratio ✅
  - Payment consistency ✅
  - Balance stability ✅
  - Spending volatility ✅

### 4. Zero-Knowledge Identity ✅

- **World ID** integration ensures one-human-one-score
- `nullifier_hash` attached to on-chain credit profile
- Provides Sybil resistance **without revealing personal identity**

### Privacy Comparison

| Data Type | Standard Mode | Confidential Compute Mode |
|-----------|--------------|---------------------------|
| API Keys | Hidden (CRE Secrets) ✅ | Hidden (CRE Secrets) ✅ |
| Bank Data | Never on-chain ✅ | Never on-chain ✅ |
| PII | Sanitized ✅ | Sanitized ✅ |
| Credit Score | **Public** ❌ | **Encrypted** ✅ |
| Loan Amounts | **Public** ❌ | **Hidden (commitments)** ✅ |
| Transactions | **Public** ❌ | **Encrypted** ✅ |

**See**: [PRIVACY_TRACK_IMPLEMENTATION.md](./PRIVACY_TRACK_IMPLEMENTATION.md) for complete privacy architecture

---

## 🚀 Quick Start

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

# Install frontend dependencies
npm install

# Install CRE workflow dependencies
cd PrivaCRE/my-workflow && npm install && cd ../..
```

### Run the CRE Simulation

The simulation demonstrates the full Privacy Track workflow: Plaid → AI → On-chain settlement.

```bash
npm run simulate
```

Or directly:

```bash
node scripts/simulate-workflow.js
```

### Deploy Smart Contracts

```bash
# Compile contracts
npm run compile

# Deploy to Tenderly Virtual Testnet (Sepolia fork)
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

## 📁 Project Structure

```
PrivaCRE/
├── PrivaCRE/my-workflow/          # 🔗 Chainlink CRE Workflow
│   ├── main.ts                    # Main workflow (Confidential HTTP + AI)
│   ├── workflow.yaml              # CRE workflow definition
│   ├── config.staging.json        # Staging config (Plaid sandbox + Groq)
│   └── config.production.json     # Production config
├── contracts/                     # Solidity smart contracts
│   ├── CrestVault.sol             # 🔗 Credit-gated lending vault + Chainlink Price Feed
│   ├── PrivaVault.sol             # 🔗 Core lending vault + Chainlink Price Feed
│   ├── MockUSDC.sol               # Test stablecoin
│   └── MockPriceFeed.sol          # Mock price feed for testing
├── scripts/                       # Deployment & simulation scripts
│   ├── deploy.js                  # Contract deployment
│   └── simulate-workflow.js       # 🔗 CRE local simulation
├── src/                           # Next.js frontend
│   ├── app/
│   │   ├── auth/page.tsx          # Wallet connect + World ID verification
│   │   ├── bridge/page.tsx        # Plaid bank data connection
│   │   ├── orchestration/page.tsx # Real-time CRE pipeline visualization
│   │   ├── lending/page.tsx       # DeFi lending vault UI
│   │   ├── dashboard/page.tsx     # Credit score + World ID dashboard
│   │   └── api/cre/route.ts       # 🔗 CRE workflow API trigger
│   └── hooks/
│       └── useOrchestration.ts    # CRE pipeline state management
└── scoring_methodology.md         # Scoring algorithm documentation
```

---

## 📊 Credit Scoring Logic

The AI (Groq Llama 3.3 70B) analyzes sanitized financial features:

| Feature | Weight | Description |
|---|---|---|
| Debt-to-Income Ratio | 40% | Monthly obligations vs. income |
| Payment Consistency | 30% | On-time payment history |
| Account Balance Stability | 20% | Average balance volatility |
| Spending Volatility | 10% | Month-over-month spending changes |

### Loan Tiers

| Tier | Score | Collateral Ratio | Access |
|---|---|---|---|
| **Prime** | 80+ | **110%** | Full access |
| **Standard** | 50–79 | **150%** | Full access |
| **Insufficient** | < 50 | N/A | Not eligible |

---

## 🧪 Testing

```bash
# Run CRE workflow simulation (demonstrates Privacy Track requirements)
npm run simulate

# Compile + test smart contracts
npm run compile
npm run test:contracts
```

---

## 📝 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
# Blockchain
RPC_URL_SEPOLIA=<your_tenderly_rpc>
PRIVATE_KEY=<deployer_private_key>

# Plaid (also stored in CRE Secrets Manager)
PLAID_CLIENT_ID=<your_client_id>
PLAID_SECRET=<your_sandbox_secret>
PLAID_ENV=sandbox

# AI (also stored in CRE Secrets Manager)
GROQ_API_KEY=<your_groq_api_key>

# World ID
NEXT_PUBLIC_WORLD_ID_APP_ID=app_7141eab28d3662245856d528b69d89e4
```

### CRE Secrets Manager

API credentials are stored in the CRE Secrets Manager (not in `.env`) to leverage Confidential HTTP:

```json
{
  "PLAID_CLIENT_ID": "<your_plaid_client_id>",
  "PLAID_SECRET": "<your_plaid_secret>",
  "GROQ_API_KEY": "<your_groq_api_key>",
  "PRIVATE_KEY": "<deployer_private_key>"
}
```

---

## 🏆 Hackathon Checklist

### Privacy Track Requirements

| Requirement | Status | Evidence |
|---|---|---|
| CRE Workflow built/simulated | ✅ | `PrivaCRE/my-workflow/main.ts` |
| Integrates blockchain + external API | ✅ | Plaid API (bank data) + CrestVault.sol |
| Confidential HTTP capability | ✅ | `runtime.getSecret` + `runtime.httpRequest` |
| API credentials never exposed on-chain | ✅ | CRE Secrets Manager |
| Sensitive data protected | ✅ | PII sanitization before AI analysis |
| Successful simulation demonstrated | ✅ | `npm run simulate` |
| 3–5 min demo video | ⬜ | (Record demo) |
| Public source code | ⬜ | (Publish to GitHub) |
| README links to Chainlink files | ✅ | See "Chainlink Integrations" section above |

---

## 🔗 Links

- **Live Demo**: `http://localhost:3000` (or deployed URL)
- **Tenderly Dashboard**: https://dashboard.tenderly.co
- **Chainlink CRE Docs**: https://docs.chain.link/chainlink-automation/concepts/getting-started

---

## 👥 Team

Built for **Chainlink Convergence Hackathon 2025**

## 🙏 Acknowledgments

- **Chainlink** — CRE, Confidential HTTP, Price Feeds
- **World ID / Worldcoin** — Sybil-resistant identity
- **Groq** — High-performance Llama 3.3 inference
- **Plaid** — Secure bank data connectivity
- **Tenderly** — Virtual testnet and debugging
