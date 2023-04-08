import styled from "styled-components/macro";

import { Stats } from "./Stats";
import db from "./db/db.json";
import {
  Line,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Brush,
} from "recharts";
import { transformLapData, getTeamFastestLap, getTeamLapData } from "./utils";

function App() {
  const data = transformLapData(db);

  const bestTeamLap = getTeamFastestLap(data);

  return (
    <div>
      <Header />

      <StatsContainer>
        <TeamContainer>
          <TeamStats>
            <span>{`Best lap: ${bestTeamLap.name} - ${bestTeamLap.time}`}</span>
            <span>klejfwp</span>
          </TeamStats>

          <LineChart
            width={1000}
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
            <Stats key={e.name} user={e} />
          ))}
        </PersonalStatsContainer>
      </StatsContainer>
    </div>
  );
}

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

export default App;
