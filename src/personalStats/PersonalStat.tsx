import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import {
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import styled from "styled-components/macro";
import { useWindowSize } from "../hooks/useWindowSize";
import { SessionData, Heat } from "../Types";
import { sessionEnumToSessionNr } from "../utils";
import { HeaderStat } from "./HeaderStat";

type Props = {
  user: SessionData;
};

const PersonalStat = ({ user }: Props) => {
  const [data] = useState(user);

  const [vertical] = useWindowSize();
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    setChartHeight(vertical > 767 ? 300 : 200);
    setChartWidth(vertical > 767 ? 500 : 300);
  }, [vertical]);

  return (
    <StatContainer>
      <HeaderContainer>
        <Name>
          <BsPersonCircle />
          <MySpan>{data.name}</MySpan>
        </Name>
        <HeaderStat
          heat={sessionEnumToSessionNr(Heat.HEAT_ONE)}
          laps={data.laps.map((e) => e.HEAT_ONE) as number[]}
          username={user.name}
        />
        {data.laps[0].HEAT_TWO ? (
          <HeaderStat
            heat={sessionEnumToSessionNr(Heat.HEAT_TWO)}
            laps={data.laps.map((e) => e.HEAT_TWO) as number[]}
            username={user.name}
          />
        ) : (
          <div></div>
        )}
      </HeaderContainer>
      <ChartContainer>
        <LineChart
          width={chartWidth}
          height={chartHeight}
          data={
            data.laps.some((e) => Heat.HEAT_TWO in e)
              ? data.laps
                  .filter((e) => e.HEAT_ONE! < 60)
                  .filter((e) => e.HEAT_TWO! < 60)
              : data.laps.filter((e) => e.HEAT_ONE! < 60)
          }
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="monotone"
            dot={false}
            dataKey={Heat.HEAT_ONE}
            stroke="#bf84d8"
          />
          {data.laps.some((e) => Heat.HEAT_TWO in e) && (
            <Line
              dot={false}
              type="monotone"
              dataKey={Heat.HEAT_TWO}
              stroke="#82ca9d"
            />
          )}
          <Legend />
          <CartesianGrid stroke="#ccc" strokeDasharray="7 7" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Sec", angle: -90 }} domain={[33]} />
          <Tooltip />
        </LineChart>
      </ChartContainer>
    </StatContainer>
  );
};

export default PersonalStat;

const HeaderContainer = ({
  children,
  classname,
}: {
  children: React.ReactElement[];
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
