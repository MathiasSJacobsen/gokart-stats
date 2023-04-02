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
import { ChartType, SessionData, Session } from "./Types";

type Props = {
  user: SessionData;
};

export const Stats = ({ user }: Props) => {
  const [data, setData] = useState(user);

  useEffect(() => {
    setFastestLap(getFastestLap(data.laps));
    setAverage(getAverage(data.laps));
    setPitstop(getPitstop(data.laps));
  }, [data]);

  const [fastestLap, setFastestLap] = useState(0);
  const [average, setAverage] = useState(0);
  const [pitstop, setPitstop] = useState(0);

  return (
    <StatContainer>
      <HeaderStats>
        <Name>{user.name}</Name>
        <MetaStat>
          <span>Best lap: {fastestLap}</span>
          <span>Average: {average.toFixed(3)}</span>
          <span>Pitstop: {pitstop}</span>
        </MetaStat>
      </HeaderStats>

      <LineChart
        width={500}
        height={300}
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

const getPitstop = (chartData: ChartType) => {
  // @TODO: Fix null assertion
  return chartData[0].SESSION_ONE! > 60 ? chartData[0].SESSION_ONE! : -1;
};

const getFastestLap = (chartData: ChartType) => {
  // @TODO: Fix null assertion
  return [
    ...chartData.map((e) => e.SESSION_ONE),
    ...chartData.map((e) => e.SESSION_TWO),
  ]
    .filter((val) => val !== undefined)
    .sort((a, b) => a! - b!)
    .at(0)!;
};

const getAverage = (chartData: ChartType) => {
  // @TODO: Fix null assertion
  const laps = [
    ...chartData.map((e) => e.SESSION_ONE),
    ...chartData.map((e) => e.SESSION_TWO),
  ].filter((val) => val !== undefined)!;
  return laps.reduce((pre, val) => pre! + val!, 0)! / laps.length;
};

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  padding: 0 2rem 1rem 0;
  border: solid 1px;
`;

const Name = styled.h3``;

const HeaderStats = styled.div`
  padding-left: 4rem;
  margin-bottom: 1rem;
`;

const MetaStat = styled.div`
  display: flex;
  flex-direction: column;
`;
