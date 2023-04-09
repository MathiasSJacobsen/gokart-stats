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
import styled from "styled-components";
import PersonalStat from "../personalStats/PersonalStat";
import db from "../db/db.json";
import { getTeamFastestLap, getTeamLapData, transformLapData } from "../utils";
import { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";

type Props = {};

const Landing = (props: Props) => {
  const data = transformLapData(db);
  const [windowWidth, _] = useWindowSize();
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    setChartWidth(windowWidth > 767 ? 1000 : 350);
  }, [windowWidth]);

  const bestTeamLap = getTeamFastestLap(data);

  return (
    <>
      <Header />

      <StatsContainer>
        <TeamContainer>
          <TeamStats>
            <span>{`Best lap: ${bestTeamLap.name} - ${bestTeamLap.time}`}</span>
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
        <PersonalStatsContainer>
          {data.map((e) => (
            <PersonalStat key={e.name} user={e} />
          ))}
        </PersonalStatsContainer>
      </StatsContainer>
    </>
  );
};

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Bekk Gokart</h1>
    </HeaderContainer>
  );
};

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

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PersonalStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

export default Landing;
