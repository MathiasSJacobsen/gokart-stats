import { Res, SessionDBData } from "./Types";
import dbOne from "./db/sessionOne.json";
import dbTwo from "./db/sessionTwo.json";
import dbThree from "./db/sessionThree.json";
import dbSeven from "./db/sessionSeven.json";

export const getDateMap = (): { [key: string]: number } => {
  return {
    "21/3/23": 0,
    "25/4/23": 1,
    "23/5/23": 2,
    "06/9/23": 7,
    "2/5/23": 99, // utfordringen
  };
};
/**
 * Get database
 * @param session session number
 * @returns Returns the spesified session database, if none is given then returns all session data as a database
 */
export const getDb = (session?: number) => {
  switch (session) {
    case 1:
      return dbOne;
    case 2:
      return dbTwo;
    case 3:
      return dbThree;
    case 7:
      return dbSeven;
    default:
      return [...dbOne, ...dbTwo, ...dbThree, ...dbSeven];
  }
};

export const mapLapTimeToNumber = (lapTime: string) => {
  if (lapTime.length < 7) {
    return Number(lapTime);
  } else {
    const [min, sec, ms] = lapTime.split(".").map(Number);
    return Number(`${min * 60 + sec}.${ms}`);
  }
};

export function transformLapData(data: SessionDBData[]) {
  const dateMap = getDateMap();
  const result2: Res = {};
  data.forEach((item) => {
    const { name, date, laps } = item;

    if (!result2.hasOwnProperty(name)) {
      result2[name] = {};
    }

    if (!result2[name].hasOwnProperty(dateMap[date])) {
      result2[name][dateMap[date]] = [];
    }

    result2[name][dateMap[date]].push(laps.map(mapLapTimeToNumber));
  });

  return result2;
}

export const getTeamLapData = (data: Res) => {
  let c = -1;
  return dbOne.flatMap((e) => {
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

export const getTeamFastestLap = (data: Res) => {
  let best: { time: number; name: string } = { name: "Null", time: 10000 };
  Object.keys(data).forEach((element) => {
    Object.keys(data[element]).forEach((e) =>
      data[element][parseInt(e)].forEach((arr) =>
        arr.forEach((nr) => {
          if (best === undefined || best.time > nr) {
            best.name = element;
            best.time = nr;
          }
        })
      )
    );
  });
  return best;
};
