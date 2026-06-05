"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface Props {
  data: any[];
}

export function RainChart({ data }: Props) {
  return (
    <div className="h-72 w-full rounded-xl border border-[#13223f] bg-[#091225] p-5 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            cursor={{ fill: "#13223f", opacity: 0.2, radius: 4 }}
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
            formatter={(value: any) => [`${value}%`, "Precipitation"]}
          />

          {/* Premium UI Data Bar Configuration */}
          <Bar
            dataKey="rainChance"
            fill="#1bf8c3"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
