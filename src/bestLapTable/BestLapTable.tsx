import styled from "styled-components/macro";
import { getDb, mapLapTimeToNumber } from "../utils";
import { BsPersonCircle } from "react-icons/bs";

const BestLapTable = () => {
  const data = getDb();
  const getBestLaps = (
    A: {
      date: string;
      name: string;
      laps: string[];
    }[]
  ) => {
    const bestTimes: Record<string, number> = {};

    A.forEach((obj) => {
      const name = obj.name;
      const lapTimes = obj.laps.map(mapLapTimeToNumber);

      if (!bestTimes[name]) {
        bestTimes[name] = Math.min(...lapTimes);
      } else {
        bestTimes[name] = Math.min(bestTimes[name], ...lapTimes);
      }
    });

    const B = Object.entries(bestTimes).map(([name, bestTime]) => {
      return { name, best_time: bestTime };
    });

    return B.sort((a, b) => a.best_time - b.best_time);
  };

  /**
   * Beregner intervalltiden mellom den nåværende personen og personen som kommer før.
   * @param {Object[]} runners - Liste med objekter som inneholder navn og beste løpstid.
   * @returns {Object[]} Liste med objekter som inneholder navn, beste løpstid og intervalltid.
   */
  function calculateIntervals(
    runners: {
      name: string;
      best_time: number;
    }[]
  ) {
    if (!Array.isArray(runners)) {
      throw new Error("Inputparameter må være en liste.");
    }

    const results = [];

    for (let i = 0; i < runners.length; i++) {
      const curr = runners[i];
      let prevBestTime = null;
      let interval = null;

      if (i > 0) {
        prevBestTime = runners[i - 1].best_time;
        interval = (curr.best_time - prevBestTime).toFixed(3);
      }

      results.push({ name: curr.name, best_time: curr.best_time, interval });
    }

    return results;
  }
  console.log(calculateIntervals(getBestLaps(data)));

  return (
    <Container>
      <ListItem bold>
        <span>Name</span>
        <NumberContainer>
          <span>INT</span>
          <span>BT</span>
        </NumberContainer>
      </ListItem>
      {calculateIntervals(getBestLaps(data)).map((e, i) => (
        <ListItem>
          <Name>
            <Icon />
            {e.name}
          </Name>
          <NumberContainer>
            <span>{e.interval}</span>
            <span>{e.best_time}</span>
          </NumberContainer>
        </ListItem>
      ))}
    </Container>
  );
};

export default BestLapTable;

const Container = styled.div`
  padding: 0 20%;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    padding: 0 5%;
  }
`;
const ListItem = styled.div<{ bold?: boolean }>`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
  padding: 1rem;
  font-weight: ${({ bold }) => (bold ? "bold" : "")};
`;

const NumberContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    width: 6rem;
  }
`;

const Name = styled.span`
  width: 50%;
  display: flex;
  align-items: center;
`;
const Icon = styled(BsPersonCircle)`
  margin-right: 0.5rem;
`;
