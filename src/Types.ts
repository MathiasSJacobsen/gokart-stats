export type SessionDBData = {
  date: string;
  name: string;
  laps: string[];
};

export type Res = {
  [key: string]: {
    [key: number]: number[][];
  };
};
