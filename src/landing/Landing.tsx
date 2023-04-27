import styled from "styled-components";
import PersonalStat from "../personalStats/PersonalStat";
import dbOne from "../db/sessionOne.json";
import dbTwo from "../db/sessionTwo.json";

import { transformLapData } from "../utils";

type Props = {};

const Landing = (props: Props) => {
  const data = transformLapData([...dbOne, ...dbTwo]);

  return (
    <StatsContainer>
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

const PersonalStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Landing;
