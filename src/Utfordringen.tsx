import styled from "styled-components/macro";
import db from "./db/utfordringen.json";
import { transformLapData } from "./utils";
import { useState } from "react";
import { PersonalStatsContainer } from "./landing/Landing";
import PersonalStat from "./personalStats/PersonalStat";
import { Res } from "./Types";

const Utfordringen = () => {
  const [data] = useState<Res>(transformLapData(db));
  if (!data) return null;

  return (
    <StatsContainer>
      <h4>Message from the stewards:</h4>
      <p>Adrian Flatner under investigation for causing a collision turn 1.</p>
      <p>
        Sivert Schou Olsen under investigation for causing a collision turn 7.
      </p>
      <PersonalStatsContainer>
        {Object.keys(data).map((e: string) => (
          <PersonalStat key={e} name={e} user={data[e]} domain={[31, 48]} />
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

export default Utfordringen;
