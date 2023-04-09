import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import styled from "styled-components/macro";
import {
  getFastestLap,
  getAverageLapsTime,
  getPitstop,
} from "../dataCrunshing";
import { useWindowSize } from "../hooks/useWindowSize";
import { SessionData, Session } from "../Types";
import { HeaderStat } from "./HeaderStat";

type Props = {
  user: SessionData;
};

const StatContainer = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  padding: 0 2rem 1rem 0;
  border: solid 1px;

  @media (max-width: 767px) {
    grid-column: span 4;
  }
`;

const PersonalStat = ({ user }: Props) => {
  const [data, setData] = useState(user);

  const [vertical] = useWindowSize();
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    setFastestLap(getFastestLap(data.laps));
    setAverage(getAverageLapsTime(data.laps));
    setPitstop(getPitstop(data.laps));
  }, [data]);

  useEffect(() => {
    console.log("heihei");
    setChartHeight(vertical > 767 ? 300 : 200);
    setChartWidth(vertical > 767 ? 500 : 300);
  }, [vertical]);

  const [fastestLap, setFastestLap] = useState(0);
  const [average, setAverage] = useState(0);
  const [pitstop, setPitstop] = useState(0);

  return (
    <StatContainer>
      <HeaderStat
        average={average}
        fastestLap={fastestLap}
        pitstop={pitstop}
        username={user.name}
      />
      <LineChart
        width={chartWidth}
        height={chartHeight}
        data={
          data.laps.some((e) => Session.SESSION_TWO in e)
            ? data.laps
                .filter((e) => e.SESSION_ONE! < 60)
                .filter((e) => e.SESSION_TWO! < 60)
            : data.laps.filter((e) => e.SESSION_ONE! < 60)
        }
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey={Session.SESSION_ONE} stroke="#bf84d8" />
        {data.laps.some((e) => Session.SESSION_TWO in e) && (
          <Line
            type="monotone"
            dataKey={Session.SESSION_TWO}
            stroke="#8884d8"
          />
        )}
        <ReferenceLine y={average} stroke="#8bffde9f" />
        <Legend />
        <CartesianGrid stroke="#ccc" strokeDasharray="7 7" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Sec", angle: -90 }} domain={[33]} />
        <Tooltip />
      </LineChart>
    </StatContainer>
  );
};

export default PersonalStat;
