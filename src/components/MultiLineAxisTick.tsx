import type { FC } from "react";

type RechartsTickProps = {
  x?: number;
  y?: number;
  payload?: {
    value?: string | number;
  };
  textAnchor?: "middle" | "start" | "end" | "inherit";
};

export const MultiLineAxisTick: FC<RechartsTickProps> = ({
  payload,
  x = 0,
  y = 0,
  textAnchor = "middle",
}) => {
  const value = String(payload?.value ?? "");
  const lines = value.split(" ");

  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="#666" fontSize={12}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>
          {line}
        </tspan>
      ))}
    </text>
  );
};
