import { useState, useEffect, useRef } from 'react';
import type { Webhook } from '../types/webhook';
import { generateMockWebhook, createCustomWebhook } from '../utils/webhookSimulator';

interface WebhookSimulatorProps {
  onSendWebhook: (webhook: Omit<Webhook, 'id' | 'timestamp'>) => void;
}

export function WebhookSimulator({ onSendWebhook }: WebhookSimulatorProps) {
  const [autoMode, setAutoMode] = useState(false);
  const [interval, setInterval_] = useState(2000);
  const [customSource, setCustomSource] = useState('Custom');
  const [customEndpoint, setCustomEndpoint] = useState('/webhooks/custom');
  const [customPayload, setCustomPayload] = useState('{\n  "event": "test",\n  "data": {}\n}');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (autoMode) {
      intervalRef.current = window.setInterval(() => {
        onSendWebhook(generateMockWebhook());
      }, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoMode, interval, onSendWebhook]);

  const handleSendRandom = () => {
    onSendWebhook(generateMockWebhook());
  };

  const handleSendCustom = () => {
    try {
      const payload = JSON.parse(customPayload);
      onSendWebhook(createCustomWebhook(customSource, customEndpoint, payload));
    } catch {
      alert('JSON invalido no payload');
    }
  };

  return (
    <div className="simulator-container">
      <h3>Simulador de Webhooks</h3>

      <div className="simulator-actions">
        <button className="btn btn-primary" onClick={handleSendRandom}>
          Enviar Webhook Aleatorio
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => setShowCustomForm(!showCustomForm)}
        >
          {showCustomForm ? 'Ocultar' : 'Webhook Personalizado'}
        </button>
      </div>

      <div className="auto-mode">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={autoMode}
            onChange={(e) => setAutoMode(e.target.checked)}
          />
          <span>Modo automatico</span>
        </label>

        {autoMode && (
          <div className="interval-control">
            <label>Intervalo: {interval / 1000}s</label>
            <input
              type="range"
              min="500"
              max="5000"
              step="500"
              value={interval}
              onChange={(e) => setInterval_(Number(e.target.value))}
            />
          </div>
        )}
      </div>

      {showCustomForm && (
        <div className="custom-webhook-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Fonte"
              value={customSource}
              onChange={(e) => setCustomSource(e.target.value)}
            />
            <input
              type="text"
              placeholder="Endpoint"
              value={customEndpoint}
              onChange={(e) => setCustomEndpoint(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Payload JSON"
            value={customPayload}
            onChange={(e) => setCustomPayload(e.target.value)}
            rows={6}
          />
          <button className="btn btn-primary" onClick={handleSendCustom}>
            Enviar Webhook Personalizado
          </button>
        </div>
      )}
    </div>
  );
}
