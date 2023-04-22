import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { BsPersonCircle } from "react-icons/bs";
import {
  getAverageSessionLapTime,
  getPitstop,
  getSessionFastestLap,
} from "../dataCrunshing";

type Props = {
  laps: number[];
  username: string;
  session: number;
};

export const HeaderStat = ({ session, laps, username }: Props) => {
  const [average, setAverage] = useState(0);
  const [fastestLap, setFastestLap] = useState(0);
  const [pitstop, setPitstop] = useState(0);

  useEffect(() => {
    setFastestLap(getSessionFastestLap(laps));
    setAverage(getAverageSessionLapTime(laps));
    setPitstop(getPitstop(laps));
  }, [laps]);

  return (
    <HeaderStats>
      <SessionData>
        <h4>Session {session}:</h4>
        <MetaStat>
          <KeyStat>Best lap: {fastestLap}</KeyStat>
          <KeyStat>Average: {average.toFixed(3)}</KeyStat>
          <KeyStat>Pitstop: {pitstop}</KeyStat>
        </MetaStat>
      </SessionData>
    </HeaderStats>
  );
};

const Name = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem;
`;
const MySpan = styled.span`
  margin-left: 1rem;
`;
const KeyStat = styled.span`
  margin-right: 1rem;
`;

const HeaderStats = styled.div`
  margin: 1rem 1rem 0 1rem;
`;

const MetaStat = styled.div`
  display: flex;
  flex-direction: row;
`;

const SessionData = styled.div`
  margin: 1rem;
`;
