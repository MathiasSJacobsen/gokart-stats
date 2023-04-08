import React from "react";
import styled from "styled-components/macro";

type Props = {
  average: number;
  fastestLap: number;
  pitstop: number;
  username: string;
};

export const HeaderStat = ({
  average,
  fastestLap,
  pitstop,
  username,
}: Props) => {
  return (
    <HeaderStats>
      <Name>{username}</Name>
      <MetaStat>
        <span>Best lap: {fastestLap}</span>
        <span>Average: {average.toFixed(3)}</span>
        <span>Pitstop: {pitstop}</span>
      </MetaStat>
    </HeaderStats>
  );
};

const Name = styled.h3``;

const HeaderStats = styled.div`
  padding-left: 4rem;
  margin-bottom: 1rem;
`;

const MetaStat = styled.div`
  display: flex;
  flex-direction: column;
`;
