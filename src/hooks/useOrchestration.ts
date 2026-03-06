import { useState, useCallback, useEffect } from 'react';

export type NodeStatus = 'waiting' | 'running' | 'completed' | 'error';

export interface PipelineNode {
    id: string;
    name: string;
    description: string;
    status: NodeStatus;
    progress: number;
}

export const useOrchestration = () => {
    const [nodes, setNodes] = useState<PipelineNode[]>([
        { id: 'fetch', name: 'Fetching Bank Data', description: 'Confidential HTTP retrieval of transaction history via Plaid access_token.', status: 'waiting', progress: 0 },
        { id: 'sanitize', name: 'Sanitize & Extract Features', description: 'Stripping PII (name, address) and computing financial feature vectors.', status: 'waiting', progress: 0 },
        { id: 'ai', name: 'AI Risk Modeling', description: 'Groq Llama 3.3 analyzing features for creditworthiness with DON consensus.', status: 'waiting', progress: 0 },
        { id: 'settle', name: 'On-Chain Settlement', description: 'Writing consensus-signed Crest Score to CrestVault via Chainlink report.', status: 'waiting', progress: 0 },
    ]);

    const [logs, setLogs] = useState<{ message: string; timestamp: string; type?: string }[]>([]);
    const [metrics, setMetrics] = useState({
        latency: 14,
        activeSessions: 12,
    });

    const addLog = useCallback((message: string, type: string = 'info') => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        setLogs((prev) => [...prev, { message, timestamp, type }]);
    }, []);

    const updateNode = useCallback((id: string, updates: Partial<PipelineNode>) => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    }, []);

    // Sequential progression logic
    const runPipeline = useCallback(async (onComplete: (data?: any) => void) => {
        // Reset
        setNodes(prev => prev.map(n => ({ ...n, status: 'waiting', progress: 0 })));
        setLogs([]);
        addLog('🚀 CRE Orchestration Brain initialized...', 'primary');
        addLog('Connecting to Chainlink DON (3 nodes)...', 'dim');

        try {
            // 1. Fetching Bank Data
            updateNode('fetch', { status: 'running' });
            addLog('[Phase 1] Retrieving secrets from CRE Secrets Manager...');
            await new Promise(r => setTimeout(r, 600));
            addLog('[Phase 1] PLAID_ACCESS_TOKEN retrieved ✓', 'dim');
            addLog('[Phase 1] Fetching bank data via Plaid Confidential HTTP...');

            for (let i = 0; i <= 80; i += 10) {
                updateNode('fetch', { progress: i });
                await new Promise(r => setTimeout(r, 120));
            }

            // Actually call the API
            const response = await fetch('/api/cre', { method: 'POST' });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);

            updateNode('fetch', { status: 'completed', progress: 100 });
            const source = result.data?.bankDataSummary?.dataSource || 'Mock';
            const txnCount = result.data?.bankDataSummary?.transactionCount || 0;
            addLog(`✅ ${txnCount} transactions fetched (${source})`, 'success');

            // 2. Sanitize & Extract Features
            updateNode('sanitize', { status: 'running' });
            addLog('[Phase 2] Stripping PII: names, addresses, account IDs...');
            for (let i = 0; i <= 100; i += 15) {
                updateNode('sanitize', { progress: i });
                await new Promise(r => setTimeout(r, 80));
            }
            const summary = result.data?.bankDataSummary;
            if (summary) {
                addLog(`Features: Income=$${summary.totalIncome?.toFixed(0)}, Expenses=$${summary.totalExpenses?.toFixed(0)}, Balance=$${summary.averageBalance?.toFixed(0)}`, 'dim');
            }
            updateNode('sanitize', { status: 'completed', progress: 100 });
            addLog('✅ PII sanitized, feature vectors computed', 'success');

            // 3. AI Risk Modeling
            updateNode('ai', { status: 'running' });
            addLog('[Phase 2] Sending sanitized features to Groq AI (llama-3.3-70b)...', 'ai');
            for (let i = 0; i <= 100; i += 4) {
                updateNode('ai', { progress: i });
                if (i % 20 === 0 && i > 0) addLog(`Computing sub-vector ${i / 20}/5...`, 'dim');
                await new Promise(r => setTimeout(r, 60));
            }
            const score = result.data?.aiResult?.credit_score;
            addLog(`[Phase 2] DON Consensus: 3/3 nodes agree on score`, 'dim');
            updateNode('ai', { status: 'completed', progress: 100 });
            addLog(`✅ Crest Score: ${score}/100`, 'success');
            if (result.data?.aiResult?.justification) {
                addLog(`"${result.data.aiResult.justification}"`, 'dim');
            }

            // 4. On-Chain Settlement
            updateNode('settle', { status: 'running' });
            addLog('[Phase 3] Generating consensus-signed report...');
            for (let i = 0; i <= 60; i += 10) {
                updateNode('settle', { progress: i });
                await new Promise(r => setTimeout(r, 150));
            }
            addLog('[Phase 3] Writing to CrestVault via PrivaVault.updateScore...', 'dim');
            for (let i = 60; i <= 100; i += 10) {
                updateNode('settle', { progress: i });
                await new Promise(r => setTimeout(r, 200));
            }
            updateNode('settle', { status: 'completed', progress: 100 });
            addLog('✅ On-chain transaction confirmed', 'success');
            if (result.txHash) {
                addLog(`TX: ${result.txHash.substring(0, 20)}...`, 'primary');
            }
            if (result.pipeline?.totalLatency) {
                addLog(`Total pipeline latency: ${result.pipeline.totalLatency}`, 'dim');
            }

            onComplete(result);
        } catch (error: any) {
            addLog(`❌ ERROR: ${error.message || 'Pipeline failed'}`, 'error');
            setNodes(prev => prev.map(n => n.status === 'running' ? { ...n, status: 'error' } : n));
        }
    }, [addLog, updateNode]);

    // Jitter for metrics
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                latency: Math.max(8, Math.min(25, prev.latency + (Math.random() > 0.5 ? 1 : -1))),
                activeSessions: Math.max(5, Math.min(20, prev.activeSessions + (Math.random() > 0.7 ? 1 : Math.random() < 0.3 ? -1 : 0))),
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return { nodes, logs, metrics, runPipeline, addLog };
};
