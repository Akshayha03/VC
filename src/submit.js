// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((s) => s.nodes);
    const edges = useStore((s) => s.edges);
    const [status, setStatus] = useState('idle'); 
    const [message, setMessage] = useState('');

    const BACKEND_URL = 'http://127.0.0.1:8000';
    const ENDPOINT_PATH = '/pipelines/parse';

    const onSubmit = async () => {
        setStatus('sending');
        setMessage('');

        const payload = {
            submittedAt: new Date().toISOString(),
            nodes,
            edges,
        };

        try {
            const res = await fetch(`${BACKEND_URL}${ENDPOINT_PATH}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const contentType = res.headers.get('content-type') || '';
            const body = contentType.includes('application/json') ? await res.json() : await res.text();

            if (!res.ok) {
                setStatus('error');
                setMessage(
                    typeof body === 'string'
                        ? body
                        : JSON.stringify(body, null, 2)
                );
                return;
            }

            setStatus('success');
            if (typeof body === "object") {
                const formatted = `
            Nodes        : ${body.num_nodes}
            Edges        : ${body.num_edges}
            Is DAG       : ${body.is_dag}
            Output Text  : ${body.output_text ?? "N/A"}
            `;
                setMessage(formatted);
            } else {
                setMessage(body);
            }
        } catch (err) {
            setStatus('error');
            setMessage(err?.message || String(err));
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
            <button type="button" onClick={onSubmit} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Submit'}
            </button>
            {status !== 'idle' && (
                <div style={{ width: 'min(900px, 92vw)', fontSize: 12 }}>
                    <div style={{ marginBottom: 6, fontWeight: 600 }}>
                        {status === 'success' ? 'Backend response' : 'Submit error'}
                        <span style={{ marginLeft: 8, fontWeight: 400, color: '#5b667a' }}>
                            {`${BACKEND_URL}${ENDPOINT_PATH}`}
                        </span>
                    </div>
                    <pre style={{
                        margin: 0,
                        padding: 10,
                        borderRadius: 10,
                        border: '1px solid #d7dbe7',
                        background: '#ffffff',
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'anywhere',
                        maxHeight: 220,
                        overflow: 'auto',
                    }}>{message || '(no body)'}</pre>
                </div>
            )}
        </div>
    );
}
