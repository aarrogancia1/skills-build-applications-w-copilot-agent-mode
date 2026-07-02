import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadLeaderboard = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${getApiBaseUrl()}leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard.');
        }

        const payload = await response.json();
        if (isActive) {
          setEntries(normalizeRecords(payload));
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Competition</p>
            <h2 className="h4 mb-0">Leaderboard</h2>
          </div>
          <span className="badge bg-warning-subtle text-warning">{entries.length} positions</span>
        </div>

        {loading && <p className="text-muted">Loading leaderboard…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <ol className="list-group list-group-numbered">
            {entries.map((entry) => (
              <li className="list-group-item d-flex justify-content-between align-items-start" key={entry._id || entry.userName}>
                <div>
                  <div className="fw-semibold">{entry.userName}</div>
                  <div className="text-muted small">{entry.teamName || 'Independent'}</div>
                </div>
                <span className="badge bg-primary">{entry.score}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
