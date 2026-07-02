import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern fitness tracking for teams</h1>
              <p className="lead text-muted mb-4">
                Monitor workouts, manage teams, and stay motivated with a polished multi-tier experience.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a className="btn btn-primary btn-lg" href="https://vite.dev/" target="_blank" rel="noreferrer">
                  Explore the stack
                </a>
                <a className="btn btn-outline-secondary btn-lg" href="http://localhost:8000/api/health" target="_blank" rel="noreferrer">
                  Check API health
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
