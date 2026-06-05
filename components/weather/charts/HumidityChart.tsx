"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface Props {
  data: any[];
}

export function HumidityChart({ data }: Props) {
  return (
    <div className="h-72 w-full rounded-xl border border-[#13223f] bg-[#091225] p-5 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          {/* Subtle geometric XAxis matching high-density timeline layouts */}
          <XAxis
            dataKey="time"
            stroke="#7c8ba1"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={10}
          />

          {/* Custom Tooltip mimicking dark dashboard panels */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#030914",
              borderColor: "#13223f",
              borderRadius: "12px",
              padding: "10px 14px",
            }}
            labelStyle={{
              color: "#7c8ba1",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "4px",
            }}
            itemStyle={{
              color: "#1bf8c3",
              fontSize: "14px",
              fontWeight: 700,
            }}
            formatter={(value: any) => [`${value}%`, "Humidity"]}
          />

          {/* Clean, high-fidelity data line in Electric Mint */}
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#1bf8c3"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              stroke: "#030914",
              strokeWidth: 2,
              fill: "#1bf8c3",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
