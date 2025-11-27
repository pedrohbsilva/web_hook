export interface Webhook {
  id: string;
  timestamp: Date;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  source: string;
  endpoint: string;
  headers: Record<string, string>;
  payload: unknown;
  status: 'success' | 'error' | 'pending';
}

export interface WebhookFilter {
  source?: string;
  status?: Webhook['status'];
  method?: Webhook['method'];
  searchTerm?: string;
}
