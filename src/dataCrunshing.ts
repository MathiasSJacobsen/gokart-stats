export const getPitstop = (laps: number[]) => {
  return laps[0] > 60 ? laps[0] : 0;
};

export const getHeatFastestLap = (laps: number[]) => {
  return (
    laps
      .slice()
      .sort((a, b) => a - b)
      .at(0) || -1
  );
};

export const getAverageHeatLapTime = (laps: number[]) => {
  const lapsWithoutPitstop = laps.filter((val, idx) => idx !== 0 || val < 60);
  return (
    lapsWithoutPitstop.reduce((pre, val) => pre + val, 0) /
    lapsWithoutPitstop.length
  );
};
