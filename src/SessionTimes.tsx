import styled from "styled-components/macro";
import dbOne from "./db/sessionOne.json";
import dbTwo from "./db/sessionTwo.json";
import { transformLapData } from "./utils";
import { useEffect, useState } from "react";
import { PersonalStatsContainer } from "./landing/Landing";
import PersonalStat from "./personalStats/PersonalStat";

const SessionTimes = ({ nr }: { nr: number }) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    setData(nr === 1 ? transformLapData(dbOne) : transformLapData(dbTwo));
  }, [nr]);
  if (!data) return null;
  return (
    <StatsContainer>
      <PersonalStatsContainer>
        {Object.keys(data).map((e: string) => (
          <PersonalStat key={e} name={e} user={data[e]} />
        ))}
      </PersonalStatsContainer>
    </StatsContainer>
  );
};

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

export default SessionTimes;
