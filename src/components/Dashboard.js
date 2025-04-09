import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "./redux/dataSlice";
import ChartRenderer from "./ChartRenderer";
import StatCard from "./StatCard"; // new import

const Dashboard = () => {
    const [analyticsMode, setAnalyticsMode] = useState(false);
    const dispatch = useDispatch();

    const { data, loading, error, lastFetched } = useSelector((state) => state.dashboard);

    useEffect(() => {
        const now = Date.now();
        const cacheDuration = 5 * 60 * 1000;
        if (!data || !lastFetched || now - lastFetched > cacheDuration) {
            dispatch(fetchDashboardData());
        }
    }, [data, lastFetched, dispatch]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!data) return null;

    const cardData = [
        {
            title: "Users",
            bg: "bg-primary",
            stats: [
                { label: "Total Players", value: data.totalPlayers },
                { label: "New Today", value: data.todaysUserAddition },
                { label: "Last 7 Days", value: data.lastSevenDaysUserAddition },
                { label: "Last 30 Days", value: data.lastThirtyDaysUsersAddition },
            ],
        },
        {
            title: "Active Users",
            bg: "bg-success",
            stats: [
                { label: "Daily", value: data.dailyActiveUsers },
                { label: "Weekly", value: data.weeklyActiveUsers },
                { label: "Monthly", value: data.monthlyActiveUsers },
            ],
        },
        {
            title: "Games",
            bg: "bg-warning",
            stats: [
                { label: "Total Games", value: data.totalGames },
                { label: "Total Rake", value: data.totalRake },
                { label: "Pot Amount", value: data.totalPotAmount },
            ],
        },
        {
            title: "Transactions",
            bg: "bg-danger",
            stats: [
                { label: "Deposits", value: data.totalDepositAmount },
                { label: "Admin Deposits", value: data.totalAdminDepositAmount },
                { label: "Bonuses", value: data.totalAdminBonusAmount },
            ],
        },
    ];

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={analyticsMode}
                        onChange={() => setAnalyticsMode(!analyticsMode)}
                        id="analyticsSwitch"
                    />
                    <label className="form-check-label" htmlFor="analyticsSwitch">
                        Analytics Mode
                    </label>
                </div>
            </div>

            {!analyticsMode ? (
                <div className="row g-4">
                    {cardData.map((card, index) => (
                        <div className="col-md-6 col-lg-3" key={index}>
                            <StatCard title={card.title} stats={card.stats} bg={card.bg} />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="col-md-6">
                            <ChartRenderer
                                type="pie"
                                title="New Users Distribution"
                                data={[
                                    { name: "Today", value: data.todaysUserAddition },
                                    { name: "Last 7 Days", value: data.lastSevenDaysUserAddition },
                                    { name: "Last 30 Days", value: data.lastThirtyDaysUsersAddition },
                                ]}
                            />
                        </div>
                        <div className="col-md-6">
                            <ChartRenderer
                                type="pie"
                                title="Active Users Distribution"
                                data={[
                                    { name: "Daily", value: data.dailyActiveUsers },
                                    { name: "Weekly", value: data.weeklyActiveUsers },
                                    { name: "Monthly", value: data.monthlyActiveUsers },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <ChartRenderer
                                type="area"
                                title="Deposits and Bonuses Comparison"
                                data={[
                                    {
                                        name: "Deposit & Bonus",
                                        Deposit: data.totalDepositAmount,
                                        AdminDeposit: data.totalAdminDepositAmount,
                                        Bonus: data.totalAdminBonusAmount,
                                    },
                                ]}
                                config={[
                                    { key: "Deposit", stroke: "#8884d8" },
                                    { key: "AdminDeposit", stroke: "#82ca9d" },
                                    { key: "Bonus", stroke: "#ffc658" },
                                ]}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;