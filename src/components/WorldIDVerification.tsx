'use client';

import { useState, useEffect } from 'react';
import { IDKitWidget, VerificationLevel, type ISuccessResult } from '@worldcoin/idkit';

interface WorldIDVerificationProps {
  action: string;
  signal?: string;
  onSuccess: (result: ISuccessResult) => void;
  onError?: (error: Error) => void;
  buttonText?: string;
  className?: string;
}

/**
 * World ID Verification Component (Managed Mode)
 * 
 * In Managed Mode, World ID handles RP signatures automatically.
 * No need to fetch signatures from backend - just verify the proof.
 */
export default function WorldIDVerification({
  action,
  signal,
  onSuccess,
  onError,
  buttonText = 'Verify with World ID',
  className = '',
}: WorldIDVerificationProps) {
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVerify = async (proof: ISuccessResult) => {
    try {
      // Send proof to backend for verification
      const response = await fetch('/api/worldid/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proof),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Verification failed');
      }

      const result = await response.json();
      
      if (result.success) {
        onSuccess(proof);
      } else {
        throw new Error(result.error || 'Verification failed');
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Verification failed';
      setError(errorMsg);
      onError?.(new Error(errorMsg));
      throw err;
    }
  };

  // Don't render until mounted (client-side only)
  if (!mounted) {
    return (
      <button
        disabled
        className={`flex items-center gap-2 px-5 py-2.5 bg-gray-900/20 border border-gray-500/30 text-gray-400 rounded-lg cursor-not-allowed ${className}`}
      >
        <span className="text-sm font-bold">Loading...</span>
      </button>
    );
  }

  const appId = process.env.NEXT_PUBLIC_WORLD_ID_APP_ID || 'app_7141eab28d3662245856d528b69d89e4';

  // Validate app_id format
  if (!appId.startsWith('app_')) {
    return (
      <div className="flex flex-col gap-2">
        <button
          disabled
          className={`flex items-center gap-2 px-5 py-2.5 bg-gray-900/20 border border-gray-500/30 text-gray-400 rounded-lg cursor-not-allowed ${className}`}
        >
          <span className="material-symbols-outlined text-sm">error</span>
          <span className="text-sm font-bold">World ID Not Configured</span>
        </button>
        <p className="text-xs text-gray-400">Invalid World ID app_id format</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setError(null)}
          className={`flex items-center gap-2 px-5 py-2.5 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-900/30 transition-all ${className}`}
        >
          <span className="material-symbols-outlined text-sm">error</span>
          <span className="text-sm font-bold">Try Again</span>
        </button>
        <p className="text-xs text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <IDKitWidget
      app_id={appId as `app_${string}`}
      action={action}
      signal={signal}
      verification_level={VerificationLevel.Orb}
      handleVerify={handleVerify}
      onSuccess={onSuccess}
    >
      {({ open }) => (
        <button
          onClick={open}
          className={`group flex items-center gap-2 px-5 py-2.5 bg-primary border border-primary text-background-dark rounded-lg hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(13,242,108,0.3)] hover:shadow-[0_0_20px_rgba(13,242,108,0.5)] ${className}`}
        >
          <span className="text-sm font-bold">{buttonText}</span>
          <span className="material-symbols-outlined text-sm">verified_user</span>
        </button>
      )}
    </IDKitWidget>
  );
}
