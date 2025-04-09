import React from 'react';
import { useSelector } from 'react-redux';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Transactions = () => {
    const { data, loading, error } = useSelector((state) => state.dashboard);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!data) return null;

    const transactionData = [
        {
            name: "Stats",
            Deposit: data.totalDepositAmount,
            AdminDeposit: data.totalAdminDepositAmount,
            Bonus: data.totalAdminBonusAmount
        }
    ];

    return (
        <div className="container my-4">
            <h3 className="mb-4">Transaction Overview (Composed Chart)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={transactionData}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Deposit" barSize={20} fill="#413ea0" />
                    <Bar dataKey="AdminDeposit" barSize={20} fill="#82ca9d" />
                    <Line type="monotone" dataKey="Bonus" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Transactions;