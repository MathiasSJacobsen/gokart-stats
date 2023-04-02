import { ChartType } from "./Types";

export const getPitstop = (chartData: ChartType) => {
  // @TODO: Fix null assertion
  return chartData[0].SESSION_ONE! > 60 ? chartData[0].SESSION_ONE! : -1;
};

export const getFastestLap = (chartData: ChartType) => {
  // @TODO: Fix null assertion
  return [
    ...chartData.map((e) => e.SESSION_ONE),
    ...chartData.map((e) => e.SESSION_TWO),
  ]
    .filter((val) => val !== undefined)
    .sort((a, b) => a! - b!)
    .at(0)!;
};

export const getAverageLapsTime = (chartData: ChartType) => {
  // @TODO: Fix null assertion
  const laps = [
    ...chartData.map((e) => e.SESSION_ONE),
    ...chartData.map((e) => e.SESSION_TWO),
  ].filter((val) => val !== undefined)!;
  return laps.reduce((pre, val) => pre! + val!, 0)! / laps.length;
};
