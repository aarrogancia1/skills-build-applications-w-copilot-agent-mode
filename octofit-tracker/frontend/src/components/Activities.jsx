import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadActivities = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${getApiBaseUrl()}/activities/`);
        if (!response.ok) {
          throw new Error('Unable to load activities.');
        }

        const payload = await response.json();
        if (isActive) {
          setActivities(normalizeRecords(payload));
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Momentum</p>
            <h2 className="h4 mb-0">Activities</h2>
          </div>
          <span className="badge bg-info-subtle text-info">{activities.length} entries</span>
        </div>

        {loading && <p className="text-muted">Loading activities…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || activity.userName}>
                    <td>{activity.userName}</td>
                    <td>{activity.type}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.caloriesBurned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
