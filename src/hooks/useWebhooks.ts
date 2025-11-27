import { useState, useCallback } from 'react';
import type { Webhook, WebhookFilter } from '../types/webhook';

export function useWebhooks() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [filter, setFilter] = useState<WebhookFilter>({});

  const addWebhook = useCallback((webhook: Omit<Webhook, 'id' | 'timestamp'>) => {
    const newWebhook: Webhook = {
      ...webhook,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setWebhooks((prev) => [newWebhook, ...prev]);
  }, []);

  const clearWebhooks = useCallback(() => {
    setWebhooks([]);
  }, []);

  const removeWebhook = useCallback((id: string) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const filteredWebhooks = webhooks.filter((webhook) => {
    if (filter.source && webhook.source !== filter.source) return false;
    if (filter.status && webhook.status !== filter.status) return false;
    if (filter.method && webhook.method !== filter.method) return false;
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      const payloadStr = JSON.stringify(webhook.payload).toLowerCase();
      const sourceMatch = webhook.source.toLowerCase().includes(term);
      const endpointMatch = webhook.endpoint.toLowerCase().includes(term);
      const payloadMatch = payloadStr.includes(term);
      if (!sourceMatch && !endpointMatch && !payloadMatch) return false;
    }
    return true;
  });

  return {
    webhooks: filteredWebhooks,
    allWebhooks: webhooks,
    addWebhook,
    clearWebhooks,
    removeWebhook,
    filter,
    setFilter,
  };
}
