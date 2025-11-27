import type { Webhook } from '../types/webhook';
import { WebhookCard } from './WebhookCard';

interface WebhookListProps {
  webhooks: Webhook[];
  onRemove: (id: string) => void;
}

export function WebhookList({ webhooks, onRemove }: WebhookListProps) {
  if (webhooks.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum webhook recebido ainda.</p>
        <p className="hint">Use o simulador para enviar webhooks de teste.</p>
      </div>
    );
  }

  return (
    <div className="webhook-list">
      {webhooks.map((webhook) => (
        <WebhookCard key={webhook.id} webhook={webhook} onRemove={onRemove} />
      ))}
    </div>
  );
}
