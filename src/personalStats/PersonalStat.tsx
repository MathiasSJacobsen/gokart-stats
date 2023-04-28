import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import styled from "styled-components/macro";
import MultiLineChart from "../shared/MulitlineChart";
import { HeaderStat } from "./HeaderStat";

type Props = {
  user: { [key: number]: number[][] };
  name: string;
};

const PersonalStat = ({ user, name }: Props) => {
  const [data] = useState(user);

  const makeHeaderStats = () => {
    let c = 0;
    return Object.values(user).flatMap((e) => {
      return (
        <>
          {e.map((ee) => {
            c++;
            return <HeaderStat laps={ee} heat={c} />;
          })}
        </>
      );
    });
  };
  return (
    <StatContainer>
      <HeaderContainer>
        <Name>
          <BsPersonCircle />
          <MySpan>{name}</MySpan>
        </Name>
        {makeHeaderStats()}
      </HeaderContainer>
      <ChartContainer>
        <MultiLineChart data={data} />
      </ChartContainer>
    </StatContainer>
  );
};

export default PersonalStat;

const HeaderContainer = ({
  children,
  classname,
}: {
  children: any;
  classname?: string;
}) => {
  return <StyledContainer className={classname}>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  margin: 1rem 1rem 0 1rem;
`;

const Name = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem;
  @media (max-width: 767px) {
    font-size: 1.5em;
  }
`;
const MySpan = styled.span`
  margin-left: 1rem;
`;

const ChartContainer = styled.div`
  margin-top: auto;
`;

const StatContainer = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  padding: 0 1rem 1rem 0;
  border: solid 1px;

  @media (max-width: 767px) {
    grid-column: span 4;
    padding: 0 0rem 1rem 0;
  }
`;
