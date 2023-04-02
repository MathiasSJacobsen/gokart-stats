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

function App() {
  const data = transformLapData(db);

  const test = () => {
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

  return (
    <div>
      <Header />
      <StatsContainer>
        <LineChart
          width={1000}
          height={300}
          data={test()}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="race" dot={false} />

          {/* <ReferenceLine y={average} stroke="#8bffde9f" /> */}
          <Legend />
          <CartesianGrid stroke="#ccc" strokeDasharray="7 7" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Sec", angle: -90 }} />
          <Tooltip />
          <Brush />
        </LineChart>
        {data.map((e) => (
          <Stats user={e} />
        ))}
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

export default App;
