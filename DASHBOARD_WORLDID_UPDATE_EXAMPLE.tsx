// Example: How to update your dashboard to use the new World ID v4 component
// Replace the old IDKitWidget usage with this:

import WorldIDVerification from '@/components/WorldIDVerification';

// In your DashboardPage component:

// Old way (v3):
/*
<IDKitWidget
  app_id={(process.env.NEXT_PUBLIC_WORLD_ID_APP_ID as `app_${string}`) || "app_7141eab28d3662245856d528b69d89e4"}
  action="verify-credit-score"
  verification_level={VerificationLevel.Orb}
  handleVerify={handleWorldIDVerification}
  onSuccess={() => setIsVerified(true)}
  environment="staging"
>
  {({ open }: { open: () => void }) => (
    <button onClick={open}>
      Verify with World ID
    </button>
  )}
</IDKitWidget>
*/

// New way (v4 with RP signatures):
<WorldIDVerification
  action="verify-credit-score"
  signal={walletAddress} // Bind to wallet address for extra security
  onSuccess={(result) => {
    console.log("World ID Proof:", result);
    setIsVerified(true);
    if (result.nullifier_hash) {
      localStorage.setItem("world_id_nullifier", result.nullifier_hash);
    }
  }}
  onError={(error) => {
    console.error("World ID verification failed:", error);
    alert(`Verification failed: ${error.message}`);
  }}
  buttonText="Verify with World ID"
  className="min-w-[200px]"
/>

// That's it! The component handles:
// 1. Fetching RP signature from backend
// 2. Configuring IDKit with RP context
// 3. Handling verification
// 4. Error states and loading states
// 5. Retry logic

// Full example in context:
export default function DashboardPage() {
  const { address } = useAccount();
  const [isVerified, setIsVerified] = useState(false);
  const walletAddress = address || "";

  return (
    <div>
      {!isVerified ? (
        <div className="flex gap-2">
          {!walletAddress && (
            <button onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
          
          <WorldIDVerification
            action="verify-credit-score"
            signal={walletAddress}
            onSuccess={(result) => {
              setIsVerified(true);
              localStorage.setItem("world_id_nullifier", result.nullifier_hash);
            }}
            buttonText="Verify with World ID"
          />
        </div>
      ) : (
        <div>
          ✅ Verified with World ID
        </div>
      )}
    </div>
  );
}
