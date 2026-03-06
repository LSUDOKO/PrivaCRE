# 🔧 RPC and Plaid Configuration Fix

## Issues Identified

### 1. ⚠️ Plaid Credentials Not Being Read
**Error:** `Plaid credentials missing in .env. Falling back to Mock Data.`

**Root Cause:** The CRE workflow's `secrets.yaml` was referencing `PLAID_CLIENT_ID_LOCAL` and `PLAID_SECRET_LOCAL`, but your `.env` file has `PLAID_CLIENT_ID` and `PLAID_SECRET` (without the `_LOCAL` suffix).

**Fix Applied:** Updated `PrivaCRE/secrets.yaml` to match your actual environment variable names.

### 2. ❌ RPC Endpoint Error
**Error:** `RPC endpoint returned HTTP client error`

**Root Cause:** Your Tenderly Virtual Testnet RPC URL might be:
- Expired (virtual testnets have limited lifespans)
- Rate-limited
- Temporarily unavailable

## ✅ Fixes Applied

### 1. Updated `PrivaCRE/secrets.yaml`
```yaml
secretsNames:
  BANK_API_KEY:
    - BANK_API_KEY_LOCAL
  AI_API_KEY:
    - AI_API_KEY_LOCAL
  PLAID_CLIENT_ID:
    - PLAID_CLIENT_ID          # ✅ Removed _LOCAL suffix
  PLAID_SECRET:
    - PLAID_SECRET             # ✅ Removed _LOCAL suffix
  PLAID_ACCESS_TOKEN:
    - PLAID_ACCESS_TOKEN       # ✅ Added
  WORLD_ID_NULLIFIER:
    - WORLD_ID_NULLIFIER       # ✅ Added
```

### 2. Updated `PrivaCRE/.env`
```bash
# Added missing variables
AI_API_KEY_LOCAL=your_groq_api_key_here
PLAID_ACCESS_TOKEN=mock_access_token
WORLD_ID_NULLIFIER=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

## 🔍 RPC Endpoint Issue - Action Required

Your Tenderly RPC URL might be expired or having issues. Here's how to fix it:

### Option 1: Get a Fresh Tenderly RPC URL

1. Go to [Tenderly Dashboard](https://dashboard.tenderly.co/LSUDOKO/project/testnet)
2. Navigate to your Virtual Testnet
3. Copy the new RPC URL
4. Update `.env`:
   ```bash
   NEXT_PUBLIC_TENDERLY_RPC=https://virtual.sepolia.rpc.tenderly.co/[YOUR_NEW_ID]
   RPC_URL_SEPOLIA=https://virtual.sepolia.rpc.tenderly.co/[YOUR_NEW_ID]
   ```

### Option 2: Use Public Sepolia RPC (Temporary)

Update `.env` to use a public RPC:
```bash
# Fallback to public Sepolia RPC
RPC_URL_SEPOLIA=https://ethereum-sepolia-rpc.publicnode.com
NEXT_PUBLIC_TENDERLY_RPC=https://ethereum-sepolia-rpc.publicnode.com
```

**Note:** Public RPCs are slower and rate-limited, but work for testing.

### Option 3: Check Tenderly Virtual Testnet Status

Your virtual testnet might need to be restarted:
```bash
# Check if your vnet is still active
curl https://virtual.sepolia.rpc.tenderly.co/4bbf41fd-7d67-46d3-93cc-883cf0440985 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

If you get an error, your vnet is expired or inactive.

## 🧪 Testing After Fix

### 1. Test Plaid Credentials
```bash
cd PrivaCRE
npm run simulate
```

You should see:
```
✅ Plaid credentials loaded successfully
```

Instead of:
```
⚠️ Plaid credentials missing in .env. Falling back to Mock Data.
```

### 2. Test RPC Connection
```bash
# Test from command line
curl $RPC_URL_SEPOLIA \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

Should return:
```json
{"jsonrpc":"2.0","id":1,"result":"0x..."}
```

### 3. Test Minting (Frontend)
1. Open your app: `npm run dev`
2. Go to Lending page
3. Click "Get 1,000 Test USDC"
4. Should succeed without RPC errors

## 📝 Updated Environment Files

### `.env` (Root)
```bash
# Plaid Configuration
PLAID_CLIENT_ID=69aadbcb2e387d000ceedf07
PLAID_SECRET=d0f0d97242ee306898c8e8f5531aeb
PLAID_ENV=sandbox
PLAID_ACCESS_TOKEN=mock_access_token  # For testing

# AI Configuration
GROQ_API_KEY=your_groq_api_key_here

# RPC URLs (UPDATE IF EXPIRED)
NEXT_PUBLIC_TENDERLY_RPC=https://virtual.sepolia.rpc.tenderly.co/4bbf41fd-7d67-46d3-93cc-883cf0440985
RPC_URL_SEPOLIA=https://virtual.sepolia.rpc.tenderly.co/4bbf41fd-7d67-46d3-93cc-883cf0440985
```

### `PrivaCRE/.env`
```bash
# Plaid
PLAID_CLIENT_ID=69aadbcb2e387d000ceedf07
PLAID_SECRET=d0f0d97242ee306898c8e8f5531aeb
PLAID_ENV=sandbox
PLAID_ACCESS_TOKEN=mock_access_token

# AI
AI_API_KEY_LOCAL=your_groq_api_key_here

# World ID
WORLD_ID_NULLIFIER=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef

# RPC
RPC_URL_SEPOLIA=https://ethereum-sepolia-rpc.publicnode.com
```

## 🚨 Common Errors and Solutions

### Error: "Plaid credentials missing"
✅ **Fixed** - secrets.yaml now matches your .env variable names

### Error: "RPC endpoint returned HTTP client error"
⚠️ **Action Required** - Update your Tenderly RPC URL (see Option 1 above)

### Error: "mint reverted"
Caused by RPC error. Fix RPC first, then retry.

### Error: "Network request failed"
Check your internet connection and RPC URL validity.

## 🎯 Quick Fix Commands

```bash
# 1. Verify secrets are correct
cat PrivaCRE/.env | grep PLAID

# 2. Test RPC connection
curl $RPC_URL_SEPOLIA \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# 3. Restart your app
npm run dev
```

## 📊 Status Checklist

- [x] Plaid credentials configuration fixed
- [x] Secrets.yaml updated to match .env
- [x] Missing environment variables added
- [ ] **TODO:** Update Tenderly RPC URL if expired
- [ ] **TODO:** Test minting USDC
- [ ] **TODO:** Test CRE workflow

## 🔗 Helpful Links

- [Tenderly Dashboard](https://dashboard.tenderly.co/LSUDOKO/project/testnet)
- [Plaid Sandbox Guide](https://plaid.com/docs/sandbox/)
- [Public Sepolia RPCs](https://chainlist.org/chain/11155111)

---

**Next Step:** Update your Tenderly RPC URL and test the minting function again!
