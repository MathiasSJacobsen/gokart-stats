import styled from "styled-components/macro";
import { getDb, transformLapData } from "./utils";
import { PersonalStatsContainer } from "./landing/Landing";
import PersonalStat from "./personalStats/PersonalStat";
import TeamStat from "./teamStat/TeamStat";

const SessionTimes = ({ nr }: { nr: number }) => {
  const data = transformLapData(getDb(nr));

  return (
    <StatsContainer>
      <TeamStat data={data} />
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
