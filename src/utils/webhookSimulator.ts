import type { Webhook } from '../types/webhook';

const SOURCES = ['GitHub', 'Stripe', 'Slack', 'Discord', 'Twilio', 'SendGrid'];
const ENDPOINTS = ['/webhooks/payment', '/webhooks/user', '/webhooks/order', '/webhooks/notification'];
const METHODS: Webhook['method'][] = ['POST', 'PUT', 'PATCH'];
const STATUSES: Webhook['status'][] = ['success', 'success', 'success', 'error', 'pending'];

const SAMPLE_PAYLOADS = {
  GitHub: {
    action: 'push',
    repository: { name: 'my-repo', full_name: 'user/my-repo' },
    pusher: { name: 'developer', email: 'dev@example.com' },
    commits: [{ message: 'feat: add new feature', sha: 'abc123' }],
  },
  Stripe: {
    type: 'payment_intent.succeeded',
    data: {
      object: {
        id: 'pi_1234567890',
        amount: 2000,
        currency: 'usd',
        status: 'succeeded',
      },
    },
  },
  Slack: {
    type: 'message',
    channel: 'C1234567890',
    user: 'U1234567890',
    text: 'Hello from Slack!',
    ts: '1234567890.123456',
  },
  Discord: {
    type: 'MESSAGE_CREATE',
    content: 'Hello from Discord!',
    author: { id: '123456789', username: 'user' },
    channel_id: '987654321',
  },
  Twilio: {
    MessageSid: 'SM1234567890',
    From: '+15551234567',
    To: '+15559876543',
    Body: 'Hello from Twilio!',
    Status: 'delivered',
  },
  SendGrid: {
    event: 'delivered',
    email: 'user@example.com',
    timestamp: Date.now(),
    sg_message_id: 'msg_1234567890',
  },
};

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockWebhook(): Omit<Webhook, 'id' | 'timestamp'> {
  const source = getRandomElement(SOURCES);
  return {
    source,
    endpoint: getRandomElement(ENDPOINTS),
    method: getRandomElement(METHODS),
    status: getRandomElement(STATUSES),
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Source': source,
      'X-Request-ID': crypto.randomUUID(),
    },
    payload: SAMPLE_PAYLOADS[source as keyof typeof SAMPLE_PAYLOADS],
  };
}

export function createCustomWebhook(
  source: string,
  endpoint: string,
  payload: unknown
): Omit<Webhook, 'id' | 'timestamp'> {
  return {
    source,
    endpoint,
    method: 'POST',
    status: 'success',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Source': source,
      'X-Request-ID': crypto.randomUUID(),
    },
    payload,
  };
}
