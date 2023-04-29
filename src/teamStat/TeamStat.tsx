import styled from "styled-components/macro";
import { getTeamFastestLap } from "../utils";
import { Res } from "../Types";

const TeamStat = ({ data }: { data: Res }) => {
  const bestTeamLap = getTeamFastestLap(data);

  return (
    <TeamContainer>
      <TeamStats>
        <span>{`Best lap: ${bestTeamLap.name} \u2014  ${bestTeamLap.time}`}</span>
      </TeamStats>
    </TeamContainer>
  );
};

export default TeamStat;

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
