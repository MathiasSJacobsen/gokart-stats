import styled from "styled-components/macro";

import { Stats } from "./Stats";
import db from "./db/db.json";
import { ChartType, SessionData, Session } from "./Types";
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
import { useEffect, useState } from "react";
import { getFastestLap } from "./dataCrunshing";

const mapLapTimeToNumber = (lapTime: string) => {
  if (lapTime.length < 7) {
    return Number(lapTime);
  } else {
    const [min, sec, ms] = lapTime.split(".").map(Number);
    return Number(`${min * 60 + sec}.${ms}`);
  }
};

const transformData = (laps: string[], session: Session): ChartType => {
  const x = session === Session.SESSION_ONE ? 1 : 2;
  return laps.map((e, i) => {
    if (x === 1) {
      return {
        name: `Lap ${i}`,
        [Session.SESSION_ONE]: mapLapTimeToNumber(e),
      };
    } else {
      return {
        name: `Lap ${i}`,
        [Session.SESSION_TWO]: mapLapTimeToNumber(e),
      };
    }
  });
};

function transformLapData(data: any[]): SessionData[] {
  let result: SessionData[] = [];
  data.forEach((item) => {
    const { name, date, laps } = item;

    if (result.length === 0 || !result.some((e) => e.name === name)) {
      const newData: SessionData = {
        name,
        date,
        laps: transformData(laps, Session.SESSION_ONE),
      };
      result.push(newData);
    } else {
      const person = result.find((e) => e.name === name) as SessionData;
      const session_two = transformData(laps, Session.SESSION_TWO);
      const sessions = person.laps.map((e) => {
        const sessionOneValue = session_two.find((n) => n.name === e.name);
        // @TODO: Problem hvis du kjører en mer runde i andre session
        return {
          ...e,
          SESSION_TWO: sessionOneValue?.SESSION_TWO,
        };
      });

      const newData: SessionData = {
        ...person,
        laps: sessions,
      };
      result = result.map((e) => (e.name === name ? newData : e));
    }
  });

  return result;
}

const getTeamLapData = () => {
  let c = -1;
  return db.flatMap((e) => {
    const times = e.laps.map(mapLapTimeToNumber);
    return times.map((m) => {
      c += 1;
      return {
        name: `Lap ${c}`,
        race: m,
      };
    });
  });
};
const getTeamFastestLap = (data: SessionData[]) => {
  let best: { time: number; name: string } = { name: "test", time: 1000 };
  data.forEach((e) => {
    const fastest = getFastestLap(e.laps);
    if (!best || best.time > fastest) {
      best = {
        name: e.name,
        time: fastest,
      };
    }
  });
  return best;
};
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
