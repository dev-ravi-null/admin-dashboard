import React from 'react';
import { useSelector } from 'react-redux';
import ChartRenderer from '../ChartRenderer';

const Users = () => {
    const { data, loading, error } = useSelector((state) => state.dashboard);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!data) return null;

    const userChartData = [
        { name: "Today", value: data.todaysUserAddition },
        { name: "Last 7 Days", value: data.lastSevenDaysUserAddition },
        { name: "Last 30 Days", value: data.lastThirtyDaysUsersAddition }
    ];

    return (
        <div className="container my-4">
            <ChartRenderer
                type="bar"
                title="User Additions (Bar Chart)"
                data={userChartData}
            />
        </div>
    );
};

export default Users;
