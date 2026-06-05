"use client";

import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface Props {
  data: any[];
}

export function TemperatureChart({ data }: Props) {
  // Unique ID generated for the SVG gradient mapping to avoid衝突 in multi-chart setups
  const gradientId = useId();

  return (
    <div className="h-72 w-full rounded-xl border border-[#13223f] bg-[#091225] p-5 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          <defs>
            {/* Custom linear gradient for premium dark-mode glow blending */}
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1bf8c3" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#1bf8c3" stopOpacity={0.0} />
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
            tickFormatter={(value) => {
              if (!value) return "";
              return new Date(value).toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
              });
            }}
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
            labelFormatter={(label) => {
              if (!label) return "";
              return new Date(label).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });
            }}
            formatter={(value: any) => [`${Math.round(value)}°`, "Temperature"]}
          />

          {/* High-fidelity Area Curve with custom gradient fill mapping */}
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#1bf8c3"
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{
              r: 5,
              stroke: "#030914",
              strokeWidth: 2,
              fill: "#1bf8c3",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
