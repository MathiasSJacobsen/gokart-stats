import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { useWindowSize } from "../hooks/useWindowSize";

interface Props {
  data: { [key: number]: number[][] };
  colors?: string[];
  domain?: number[];
}

interface Point {
  name: string;
  heat1: number;
  heat2: number;
}

const MultiLineChart: React.FC<Props> = ({
  data,
  colors = ["#82ca9d", "#bf84d8", "#d9be48"],
  domain = [30, 40],
}) => {
  const [chartData, setChartData] = useState<Point[]>();

  const [vertical] = useWindowSize();
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    setChartHeight(vertical > 767 ? 300 : 200);
    setChartWidth(vertical > 767 ? 500 : 300);
  }, [vertical]);

  useEffect(() => {
    const _points: number[][][] = [];

    Object.keys(data).forEach((key: string) => {
      data[parseInt(key)].forEach((heat, sess) => {
        heat.forEach((lap, lap_index) => {
          if (_points.length === lap_index) {
            _points.push([]);
          }
          _points[lap_index].push([lap, sess]);
        });
      });
    });

    const points: Point[] = _points.map((p, i) => {
      let obj: any = {};
      obj["name"] = `LAP_${i}`;

      let counter = 1;
      let temp = 0;
      let prev: number | null = null;
      p.forEach((v, j) => {
        if (prev && prev !== v[1] && temp === 1) {
          counter += 1;
          temp = 0;
        }

        obj[`heat${counter}`] = v[0];

        temp += 1;
        if (temp === 2) {
          temp = 0;
        }
        prev = v[1];
        counter += 1;
      });
      return obj as Point;
    });

    setChartData(points);
  }, [data]);

  if (!chartData) return null;

  return (
    <LineChart width={chartWidth} height={chartHeight} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis
        label={{ value: "Sec", angle: -90 }}
        domain={domain}
        allowDataOverflow={true}
      />
      <Legend />
      <Tooltip />
      {Object.keys(chartData[0])
        .splice(1)
        .map((_, i: number) => (
          <Line
            dot={false}
            key={i}
            dataKey={`heat${i + 1}`}
            type="monotone"
            stroke={colors[i % colors.length]}
          />
        ))}
    </LineChart>
  );
};

export default MultiLineChart;
