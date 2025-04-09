import React from "react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend,
    BarChart, Bar
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ChartRenderer = ({ type, title, data, config }) => {
    return (
        <div className="mb-5">
            <h4 className="mb-3">{title}</h4>
            <ResponsiveContainer width="100%" height={300}>
                {type === "pie" && (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                )}

                {type === "area" && (
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        {config?.map((line, i) => (
                            <Area
                                key={i}
                                type="monotone"
                                dataKey={line.key}
                                stroke={line.stroke}
                                fill={line.fill || line.stroke}
                                fillOpacity={1}
                            />
                        ))}
                    </AreaChart>
                )}

                {type === "bar" && (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {config?.map((bar, i) => (
                            <Bar key={i} dataKey={bar.key} fill={bar.fill} />
                        )) || (
                                <Bar dataKey="value" fill="#8884d8" />
                            )}
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default ChartRenderer;
