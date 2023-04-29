import { Heat, Res, SessionDBData } from "./Types";
import db from "./db/sessionOne.json";

export const mapLapTimeToNumber = (lapTime: string) => {
  if (lapTime.length < 7) {
    return Number(lapTime);
  } else {
    const [min, sec, ms] = lapTime.split(".").map(Number);
    return Number(`${min * 60 + sec}.${ms}`);
  }
};

export function transformLapData(data: SessionDBData[]) {
  const dateMap: { [key: string]: number } = { "21/3/23": 0, "25/4/23": 1 };

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

export const sessionEnumToSessionNr = (s: Heat): number => {
  switch (s) {
    case Heat.HEAT_ONE:
      return 1;
    case Heat.HEAT_TWO:
      return 2;
    default:
      throw new Error("Invalid session selected");
  }
};
