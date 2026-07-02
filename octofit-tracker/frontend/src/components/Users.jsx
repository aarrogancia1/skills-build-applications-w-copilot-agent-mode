import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadUsers = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users.');
        }

        const payload = await response.json();
        if (isActive) {
          setUsers(normalizeRecords(payload));
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Community</p>
            <h2 className="h4 mb-0">Users</h2>
          </div>
          <span className="badge bg-primary-subtle text-primary">{users.length} profiles</span>
        </div>

        {loading && <p className="text-muted">Loading users…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Goal</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.email}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.city}</td>
                    <td>{user.fitnessGoal}</td>
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

export default Users;
