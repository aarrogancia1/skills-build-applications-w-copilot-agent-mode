"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    fitnessGoal: String,
    city: String,
}, { timestamps: true });
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    sport: String,
    city: String,
    members: Number,
}, { timestamps: true });
const activitySchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: Number,
    caloriesBurned: Number,
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    streakDays: Number,
}, { timestamps: true, collection: 'leaderboard' });
const workoutSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    category: String,
    durationMinutes: Number,
    difficulty: String,
    equipment: [String],
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
