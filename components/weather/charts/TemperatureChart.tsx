"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface Props {
  data: any[];
}

export function TemperatureChart({ data }: Props) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <XAxis dataKey="time" hide />
          <Tooltip />
          <Area type="monotone" dataKey="temp" stroke="#60a5fa" fill="#60a5fa" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
