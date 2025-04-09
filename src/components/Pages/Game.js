import React from 'react';
import { useSelector } from 'react-redux';
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';

const Games = () => {
    const { data, loading, error } = useSelector((state) => state.dashboard);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!data) return null;

    const gameData = [
        { name: "Games", value: data.totalGames },
        { name: "Rake", value: data.totalRake },
        { name: "Pot", value: data.totalPotAmount }
    ];

    return (
        <div className="container my-4">
            <h3 className="mb-4">Game Analytics (Line Chart)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={gameData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Games;