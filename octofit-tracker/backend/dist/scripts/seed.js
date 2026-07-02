"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
        {
            name: 'Ava Chen',
            email: 'ava@example.com',
            age: 29,
            fitnessGoal: 'Marathon prep',
            city: 'Seattle',
        },
        {
            name: 'Noah Patel',
            email: 'noah@example.com',
            age: 34,
            fitnessGoal: 'Strength building',
            city: 'Denver',
        },
        {
            name: 'Mina Torres',
            email: 'mina@example.com',
            age: 27,
            fitnessGoal: 'Cycling endurance',
            city: 'Austin',
        },
    ]);
    await models_1.Team.insertMany([
        {
            name: 'North Stars',
            sport: 'Running',
            city: 'Seattle',
            members: 12,
        },
        {
            name: 'River Runners',
            sport: 'Cycling',
            city: 'Denver',
            members: 8,
        },
    ]);
    await models_1.Activity.insertMany([
        {
            userName: users[0].name,
            type: 'Run',
            durationMinutes: 35,
            caloriesBurned: 420,
            date: new Date('2026-07-02T06:30:00Z'),
        },
        {
            userName: users[1].name,
            type: 'Strength',
            durationMinutes: 55,
            caloriesBurned: 310,
            date: new Date('2026-07-01T19:15:00Z'),
        },
        {
            userName: users[2].name,
            type: 'Cycle',
            durationMinutes: 60,
            caloriesBurned: 500,
            date: new Date('2026-07-03T07:00:00Z'),
        },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        { userName: users[0].name, score: 1280, streakDays: 6 },
        { userName: users[1].name, score: 1120, streakDays: 4 },
        { userName: users[2].name, score: 1185, streakDays: 5 },
    ]);
    await models_1.Workout.insertMany([
        {
            name: 'HIIT Intervals',
            category: 'Cardio',
            durationMinutes: 25,
            difficulty: 'Intermediate',
            equipment: ['Jump rope'],
        },
        {
            name: 'Core Blast',
            category: 'Strength',
            durationMinutes: 20,
            difficulty: 'Beginner',
            equipment: ['Mat'],
        },
    ]);
    console.log('Seed data inserted successfully');
    await mongoose_1.default.disconnect();
};
seedDatabase().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
