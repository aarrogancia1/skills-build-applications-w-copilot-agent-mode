import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadWorkouts = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Unable to load workouts.');
        }

        const payload = await response.json();
        if (isActive) {
          setWorkouts(normalizeRecords(payload));
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Planning</p>
            <h2 className="h4 mb-0">Workouts</h2>
          </div>
          <span className="badge bg-secondary-subtle text-secondary">{workouts.length} plans</span>
        </div>

        {loading && <p className="text-muted">Loading workouts…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {workouts.map((workout) => (
              <div className="col" key={workout._id || workout.title}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-bold">{workout.title}</h3>
                  <p className="text-muted small mb-2">{workout.description}</p>
                  <p className="small mb-0">Focus: {workout.focus || 'General fitness'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
