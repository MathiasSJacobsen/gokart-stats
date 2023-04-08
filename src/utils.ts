import { getFastestLap } from "./dataCrunshing";
import { ChartType, Session, SessionData } from "./Types";
import db from "./db/db.json";

export const mapLapTimeToNumber = (lapTime: string) => {
  if (lapTime.length < 7) {
    return Number(lapTime);
  } else {
    const [min, sec, ms] = lapTime.split(".").map(Number);
    return Number(`${min * 60 + sec}.${ms}`);
  }
};

export const transformData = (laps: string[], session: Session): ChartType => {
  const x = session === Session.SESSION_ONE ? 1 : 2;
  return laps.map((e, i) => {
    if (x === 1) {
      return {
        name: `Lap ${i}`,
        [Session.SESSION_ONE]: mapLapTimeToNumber(e),
      };
    } else {
      return {
        name: `Lap ${i}`,
        [Session.SESSION_TWO]: mapLapTimeToNumber(e),
      };
    }
  });
};

export function transformLapData(data: any[]): SessionData[] {
  let result: SessionData[] = [];
  data.forEach((item) => {
    const { name, date, laps } = item;

    if (result.length === 0 || !result.some((e) => e.name === name)) {
      const newData: SessionData = {
        name,
        date,
        laps: transformData(laps, Session.SESSION_ONE),
      };
      result.push(newData);
    } else {
      const person = result.find((e) => e.name === name) as SessionData;
      const session_two = transformData(laps, Session.SESSION_TWO);
      const sessions = person.laps.map((e) => {
        const sessionOneValue = session_two.find((n) => n.name === e.name);
        // @TODO: Problem hvis du kjører en mer runde i andre session
        return {
          ...e,
          SESSION_TWO: sessionOneValue?.SESSION_TWO,
        };
      });

      const newData: SessionData = {
        ...person,
        laps: sessions,
      };
      result = result.map((e) => (e.name === name ? newData : e));
    }
  });

  return result;
}

export const getTeamLapData = () => {
  let c = -1;
  return db.flatMap((e) => {
    const times = e.laps.map(mapLapTimeToNumber);
    return times.map((m) => {
      c += 1;
      return {
        name: `Lap ${c}`,
        race: m,
      };
    });
  });
};

export const getTeamFastestLap = (data: SessionData[]) => {
  let best: { time: number; name: string } = { name: "test", time: 1000 };
  data.forEach((e) => {
    const fastest = getFastestLap(e.laps);
    if (!best || best.time > fastest) {
      best = {
        name: e.name,
        time: fastest,
      };
    }
  });
  return best;
};
