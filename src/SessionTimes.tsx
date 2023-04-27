import styled from "styled-components/macro";
import dbOne from "./db/sessionOne.json";
import dbTwo from "./db/sessionTwo.json";
import TeamStat from "./teamStat/TeamStat";
import { transformLapData } from "./utils";
import { useEffect, useState } from "react";
import { SessionData } from "./Types";
import { PersonalStatsContainer } from "./landing/Landing";
import PersonalStat from "./personalStats/PersonalStat";

const SessionTimes = ({ nr }: { nr: number }) => {
  const [data, setData] = useState<SessionData[]>();

  useEffect(() => {
    setData(nr === 1 ? transformLapData(dbOne) : transformLapData(dbTwo));
  }, [nr]);
  if (!data) return null;
  return (
    <StatsContainer>
      {nr === 1 ? <TeamStat data={data} /> : null}
      <PersonalStatsContainer>
        {data.map((e) => (
          <PersonalStat key={e.name} user={e} />
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
