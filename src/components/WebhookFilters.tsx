import type { WebhookFilter, Webhook } from '../types/webhook';

interface WebhookFiltersProps {
  filter: WebhookFilter;
  onFilterChange: (filter: WebhookFilter) => void;
  sources: string[];
}

export function WebhookFilters({ filter, onFilterChange, sources }: WebhookFiltersProps) {
  const methods: Webhook['method'][] = ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'];
  const statuses: Webhook['status'][] = ['success', 'error', 'pending'];

  return (
    <div className="filters-container">
      <input
        type="text"
        placeholder="Buscar..."
        value={filter.searchTerm || ''}
        onChange={(e) => onFilterChange({ ...filter, searchTerm: e.target.value })}
        className="search-input"
      />

      <select
        value={filter.source || ''}
        onChange={(e) => onFilterChange({ ...filter, source: e.target.value || undefined })}
        className="filter-select"
      >
        <option value="">Todas as fontes</option>
        {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>

      <select
        value={filter.method || ''}
        onChange={(e) =>
          onFilterChange({ ...filter, method: (e.target.value as Webhook['method']) || undefined })
        }
        className="filter-select"
      >
        <option value="">Todos os metodos</option>
        {methods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>

      <select
        value={filter.status || ''}
        onChange={(e) =>
          onFilterChange({ ...filter, status: (e.target.value as Webhook['status']) || undefined })
        }
        className="filter-select"
      >
        <option value="">Todos os status</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
