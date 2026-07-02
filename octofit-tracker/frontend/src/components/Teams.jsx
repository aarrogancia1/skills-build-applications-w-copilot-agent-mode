import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadTeams = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Unable to load teams.');
        }

        const payload = await response.json();
        if (isActive) {
          setTeams(normalizeRecords(payload));
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Collaboration</p>
            <h2 className="h4 mb-0">Teams</h2>
          </div>
          <span className="badge bg-success-subtle text-success">{teams.length} teams</span>
        </div>

        {loading && <p className="text-muted">Loading teams…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {teams.map((team) => (
              <div className="col" key={team._id || team.name}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-bold">{team.name}</h3>
                  <p className="text-muted mb-2">{team.description}</p>
                  <p className="small mb-0">Members: {team.memberCount || team.members?.length || 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
