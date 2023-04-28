import { ChartType } from "./Types";

export const getPitstop = (laps: (number | undefined)[]) => {
  // @TODO: Fix null assertion
  return laps[0]! > 60 ? laps[0]! : -1;
};

export const getFastestLap = (chartData: ChartType) => {
  // @TODO: Fix null assertion
  return [
    ...chartData.map((e) => e.HEAT_ONE),
    ...chartData.map((e) => e.HEAT_TWO),
  ]
    .filter((val) => val !== undefined)
    .sort((a, b) => a! - b!)
    .at(0)!;
};

export const getSessionFastestLap = (laps: (number | undefined)[]) => {
  // @TODO: Fix null assertion
  return laps
    .filter((val) => val !== undefined)
    .sort((a, b) => a! - b!)
    .at(0)!;
};

export const getAverageSessionLapTime = (laps: (number | undefined)[]) => {
  // @TODO: Fix null assertion

  const lapsWithoutPitstop = laps
    .filter((val, idx) => idx != 0 || val! < 60)
    .filter((val) => val !== undefined)!;
  return (
    lapsWithoutPitstop.reduce((pre, val) => pre! + val!, 0)! 
    / lapsWithoutPitstop.length);
};
