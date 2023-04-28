import styled from "styled-components";
import PersonalStat from "../personalStats/PersonalStat";
import dbOne from "../db/sessionOne.json";
import dbTwo from "../db/sessionTwo.json";

import { transformLapData } from "../utils";
import { Res } from "../Types";

type Props = {};

const Landing = (props: Props) => {
  const data: Res = transformLapData([...dbOne, ...dbTwo]);

  return (
    <StatsContainer>
      <p>🐛 Denne siden viser feil om du har kjørt 2 ganger, hvis du er en av de som har kjørt mer enn 1 gang se riktig data i hendholdsvis tab S1 og S2</p>
      <PersonalStatsContainer>
        {Object.keys(data).map((e: string) => (
          <PersonalStat name={e} key={e} user={data[e]} />
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

export const PersonalStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Landing;
