import { NextRequest, NextResponse } from 'next/server';

/**
 * World ID v4 Proof Verification Endpoint (Managed Mode)
 * 
 * In Managed Mode, World ID handles RP signatures automatically.
 * We just need to forward the proof to World ID's verification API.
 * 
 * API: POST https://developer.world.org/api/v4/verify/{rp_id}
 */

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Get RP ID from environment
    const rpId = process.env.NEXT_PUBLIC_WORLD_RP_ID;
    
    if (!rpId) {
      console.error('NEXT_PUBLIC_WORLD_RP_ID not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Add environment field to payload (required by World ID API)
    const verificationPayload = {
      ...payload,
      environment: 'staging', // Use 'staging' for development, 'production' for mainnet
    };

    const verifyUrl = `https://developer.world.org/api/v4/verify/${rpId}`;
    
    console.log('Verifying World ID proof with:', {
      url: verifyUrl,
      action: verificationPayload.action,
      environment: verificationPayload.environment,
      nullifier_hash: verificationPayload.responses?.[0]?.nullifier,
    });

    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verificationPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('World ID verification failed:', result);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Verification failed', 
          details: result 
        },
        { status: response.status }
      );
    }

    console.log('World ID verification successful:', result);

    // Store nullifier hash for sybil resistance
    const nullifierHash = payload.responses?.[0]?.nullifier;
    if (nullifierHash) {
      // TODO: Store nullifier in database to prevent reuse
      console.log('Nullifier hash to store:', nullifierHash);
    }

    return NextResponse.json({
      success: true,
      data: result,
      nullifier_hash: nullifierHash,
    });

  } catch (error: any) {
    console.error('Error verifying World ID proof:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Verification error', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
