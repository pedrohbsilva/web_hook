import './App.css';
import { useWebhooks } from './hooks/useWebhooks';
import {
  WebhookFilters,
  WebhookList,
  WebhookSimulator,
  WebhookStats,
} from './components';

function App() {
  const { webhooks, allWebhooks, addWebhook, clearWebhooks, removeWebhook, filter, setFilter } =
    useWebhooks();

  const uniqueSources = [...new Set(allWebhooks.map((w) => w.source))];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Webhook Dashboard</h1>
        <p className="subtitle">Monitor de webhooks em tempo real</p>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <WebhookSimulator onSendWebhook={addWebhook} />
        </aside>

        <section className="content">
          <WebhookStats webhooks={allWebhooks} />

          <div className="list-header">
            <WebhookFilters
              filter={filter}
              onFilterChange={setFilter}
              sources={uniqueSources}
            />
            <button className="btn btn-danger" onClick={clearWebhooks}>
              Limpar Tudo
            </button>
          </div>

          <WebhookList webhooks={webhooks} onRemove={removeWebhook} />
        </section>
      </main>
    </div>
  );
}

export default App;
