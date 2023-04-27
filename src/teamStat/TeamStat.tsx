import {
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from "recharts";
import styled from "styled-components/macro";
import { getTeamFastestLap, getTeamLapData } from "../utils";
import { useState, useEffect } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { SessionData } from "../Types";

const TeamStat = ({ data }: { data: SessionData[] }) => {
  const [windowWidth] = useWindowSize();
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    setChartWidth(windowWidth > 767 ? 1000 : 350);
  }, [windowWidth]);

  const bestTeamLap = getTeamFastestLap(data);
  return (
    <TeamContainer>
      <TeamStats>
        <span>{`Best lap: ${bestTeamLap.name} \u2014  ${bestTeamLap.time}`}</span>
        <span>{`Number of laps: 196`}</span>
      </TeamStats>

      <LineChart
        width={chartWidth}
        height={300}
        data={getTeamLapData()}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="race" dot={false} />
        <Legend />
        <CartesianGrid stroke="#ccc" strokeDasharray="7 7" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Sec", angle: -90 }} domain={[32]} />
        <Tooltip />
        <Brush />
      </LineChart>
    </TeamContainer>
  );
};

export default TeamStat;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeamStats = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 4rem;
  margin-bottom: 0.5rem;
`;
