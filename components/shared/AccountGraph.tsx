"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "June 1", uv: 1200 },
  { name: "June 2", uv: 2100 },
  { name: "June 3", uv: 1500 },
  { name: "June 4", uv: 3900 },
  { name: "June 5", uv: 2000 },
  { name: "June 6", uv: 2800 },
  { name: "June 7", uv: 4200 },
  { name: "June 8", uv: 2600 },
  { name: "June 9", uv: 3200 },
  { name: "June 10", uv: 5000 },
  { name: "June 11", uv: 4700 },
  { name: "June 12", uv: 2900 },
  { name: "June 13", uv: 2400 },
  { name: "June 14", uv: 4300 },
  { name: "June 15", uv: 3300 },
  { name: "June 16", uv: 2900 },
  { name: "June 17", uv: 5000 },
  { name: "June 18", uv: 4200 },
  { name: "June 19", uv: 3800 },
  { name: "June 20", uv: 3500 },
  { name: "June 21", uv: 2700 },
  { name: "June 17", uv: 4000 },
  { name: "June 18", uv: 5000 },
  { name: "June 19", uv: 3800 },
  { name: "June 20", uv: 3500 },
  { name: "June 21", uv: 3700 },
  { name: "June 17", uv: 3000 },
  { name: "June 18", uv: 5000 },
  { name: "June 19", uv: 3800 },
  { name: "June 20", uv: 3500 },
  { name: "June 21", uv: 3700 },
  { name: "June 22", uv: 2100 },
  { name: "June 23", uv: 4200 },
  { name: "June 24", uv: 4500 },
  { name: "June 25", uv: 3900 },
  { name: "June 26", uv: 4200 },
  { name: "June 27", uv: 4700 },
  { name: "June 28", uv: 4900 },
  { name: "June 29", uv: 5000 },
];

const Example = () => {
  return (
    <ResponsiveContainer width="100%" height={310}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 10,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" stroke="#444" /> */}
        <XAxis
          dataKey="name"
          tick={{
            fill: "#737897",
            fontSize: 12, // Adjust the font size
            dy: 10, // Adjust vertical position
            dx: 15, // Adjust horizontal position
          }}
          tickLine={{ stroke: "#737897" }}
          interval={6}
        />
        <YAxis
          ticks={[0, 1000, 2000, 3000, 4000, 5000]}
          tick={{
            fill: "#737897",
            fontSize: 12, // Adjust the font size
            dy: -15, // Adjust vertical position
            dx: -10, // Adjust horizontal position
          }}
          tickLine={{ stroke: "#737897" }}
        />
        <Tooltip
          cursor={{ fill: "#282227" }}
          contentStyle={{
            backgroundColor: "#333547",
            border: "1px solid #282227",
            borderRadius: "10px",
            padding: "20px 45px",
          }}
          labelStyle={{ color: "#737897", fontSize: 16 }}
          itemStyle={{
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
          }}
        />
        <Area
          type="linear"
          dataKey="uv"
          stroke="#3fd80c"
          fill="rgba(63, 216, 12, 0.1)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Example;
