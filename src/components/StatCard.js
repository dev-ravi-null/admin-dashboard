import React from "react";
import "./StatCard.css"; // optional custom CSS for styling

const StatCard = ({ title, stats, bg }) => {
    return (
        <div className={`card text-white mb-3 shadow-sm ${bg}`}>
            <div className="card-header fw-semibold">{title}</div>
            <div className="card-body">
                {stats.map((item, index) => (
                    <p className="card-text mb-2" key={index}>
                        {item.label}: <strong>{item.value}</strong>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default StatCard;