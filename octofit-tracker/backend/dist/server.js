"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const database_1 = require("./database");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        apiUrl: API_BASE_URL,
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(users);
});
app.post('/api/users/', async (req, res) => {
    const newUser = await models_1.User.create(req.body);
    res.status(201).json(newUser);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json(teams);
});
app.post('/api/teams/', async (req, res) => {
    const newTeam = await models_1.Team.create(req.body);
    res.status(201).json(newTeam);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json(activities);
});
app.post('/api/activities/', async (req, res) => {
    const newActivity = await models_1.Activity.create(req.body);
    res.status(201).json(newActivity);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).sort({ score: -1 }).lean();
    res.json(leaderboard);
});
app.post('/api/leaderboard/', async (req, res) => {
    const newEntry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json(newEntry);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(workouts);
});
app.post('/api/workouts/', async (req, res) => {
    const newWorkout = await models_1.Workout.create(req.body);
    res.status(201).json(newWorkout);
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
            console.log(`API base URL: ${API_BASE_URL}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
};
startServer();
