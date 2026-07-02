import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const apiHint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return (
    <main className="container py-4 py-lg-5">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <header className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
                <div>
                  <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
                  <h1 className="display-6 fw-bold mb-3">Modern fitness tracking for teams</h1>
                  <p className="lead text-muted mb-0">
                    Follow activity, compare performance, and keep every training plan visible across the full stack.
                  </p>
                </div>
                <div className="text-lg-end">
                  <div className="small text-muted">API target</div>
                  <div className="fw-semibold">{apiHint}</div>
                </div>
              </div>

              <nav className="nav nav-pills flex-wrap mt-4">
                <NavLink className="nav-link" to="/">Overview</NavLink>
                <NavLink className="nav-link" to="/users">Users</NavLink>
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </nav>
            </div>
          </header>

          <Routes>
            <Route
              path="/"
              element={
                <div className="row g-4">
                  <div className="col-lg-6">
                    <Users />
                  </div>
                  <div className="col-lg-6">
                    <Teams />
                  </div>
                  <div className="col-lg-6">
                    <Activities />
                  </div>
                  <div className="col-lg-6">
                    <Workouts />
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
