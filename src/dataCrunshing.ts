import { ChartType } from "./Types";

export const getPitstop = (laps: number[]) => {
  return laps[0] > 60 ? laps[0] : -1;
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

export const getSessionFastestLap = (laps: number[]) => {
  return (
    laps
      .slice()
      .sort((a, b) => a - b)
      .at(0) || -1
  );
};

export const getAverageHeatLapTime = (laps: number[]) => {
  return laps.reduce((pre, val) => pre + val, 0) / laps.length;
};
