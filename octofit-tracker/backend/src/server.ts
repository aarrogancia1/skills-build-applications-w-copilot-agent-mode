import express from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';
import { connectDatabase } from './database';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    apiUrl: API_BASE_URL,
  });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.post('/api/users/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.post('/api/teams/', async (req, res) => {
  const newTeam = await Team.create(req.body);
  res.status(201).json(newTeam);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.post('/api/activities/', async (req, res) => {
  const newActivity = await Activity.create(req.body);
  res.status(201).json(newActivity);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ score: -1 }).lean();
  res.json(leaderboard);
});

app.post('/api/leaderboard/', async (req, res) => {
  const newEntry = await LeaderboardEntry.create(req.body);
  res.status(201).json(newEntry);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

app.post('/api/workouts/', async (req, res) => {
  const newWorkout = await Workout.create(req.body);
  res.status(201).json(newWorkout);
});

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`API base URL: ${API_BASE_URL}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
