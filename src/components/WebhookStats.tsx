import type { Webhook } from '../types/webhook';

interface WebhookStatsProps {
  webhooks: Webhook[];
}

export function WebhookStats({ webhooks }: WebhookStatsProps) {
  const stats = {
    total: webhooks.length,
    success: webhooks.filter((w) => w.status === 'success').length,
    error: webhooks.filter((w) => w.status === 'error').length,
    pending: webhooks.filter((w) => w.status === 'pending').length,
  };

  const sourceStats = webhooks.reduce((acc, webhook) => {
    acc[webhook.source] = (acc[webhook.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="stats-container">
      <div className="stat-card">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-card success">
        <span className="stat-value">{stats.success}</span>
        <span className="stat-label">Sucesso</span>
      </div>
      <div className="stat-card error">
        <span className="stat-value">{stats.error}</span>
        <span className="stat-label">Erro</span>
      </div>
      <div className="stat-card pending">
        <span className="stat-value">{stats.pending}</span>
        <span className="stat-label">Pendente</span>
      </div>

      {Object.keys(sourceStats).length > 0 && (
        <div className="source-stats">
          {Object.entries(sourceStats).map(([source, count]) => (
            <span key={source} className="source-stat">
              {source}: {count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
