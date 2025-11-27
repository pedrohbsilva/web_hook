import { useState } from 'react';
import type { Webhook } from '../types/webhook';

interface WebhookCardProps {
  webhook: Webhook;
  onRemove: (id: string) => void;
}

export function WebhookCard({ webhook, onRemove }: WebhookCardProps) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    success: '#10b981',
    error: '#ef4444',
    pending: '#f59e0b',
  };

  const methodColors: Record<string, string> = {
    POST: '#3b82f6',
    GET: '#10b981',
    PUT: '#f59e0b',
    DELETE: '#ef4444',
    PATCH: '#8b5cf6',
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  return (
    <div className="webhook-card">
      <div className="webhook-header" onClick={() => setExpanded(!expanded)}>
        <div className="webhook-info">
          <span
            className="method-badge"
            style={{ backgroundColor: methodColors[webhook.method] }}
          >
            {webhook.method}
          </span>
          <span className="source-badge">{webhook.source}</span>
          <span className="endpoint">{webhook.endpoint}</span>
        </div>
        <div className="webhook-meta">
          <span
            className="status-indicator"
            style={{ backgroundColor: statusColors[webhook.status] }}
          />
          <span className="timestamp">{formatTime(webhook.timestamp)}</span>
          <button
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(webhook.id);
            }}
          >
            x
          </button>
          <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
        </div>
      </div>

      {expanded && (
        <div className="webhook-details">
          <div className="detail-section">
            <h4>Headers</h4>
            <pre>{JSON.stringify(webhook.headers, null, 2)}</pre>
          </div>
          <div className="detail-section">
            <h4>Payload</h4>
            <pre>{JSON.stringify(webhook.payload, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
