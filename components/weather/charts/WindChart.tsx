"use client";

import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface Props {
  data: any[];
}

export function WindChart({ data }: Props) {
  // Unique ID generated for the SVG gradient mapping to avoid conflicts in multi-chart setups
  const gradientId = useId();

  return (
    <div className="h-72 w-full rounded-xl border border-[#13223f] bg-[#091225] p-5 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          <defs>
            {/* Custom linear gradient for the Solar Amber theme */}
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fdb813" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#fdb813" stopOpacity={0.0} />
            </linearGradient>
          </defs>

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
              color: "#fdb813",
              fontSize: "14px",
              fontWeight: 700,
            }}
            formatter={(value: any) => [`${value} km/h`, "Wind Speed"]}
          />

          {/* High-fidelity Area Curve with custom gradient fill mapping */}
          <Area
            type="monotone"
            dataKey="windSpeed"
            stroke="#fdb813"
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{
              r: 5,
              stroke: "#030914",
              strokeWidth: 2,
              fill: "#fdb813",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
