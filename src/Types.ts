export type SessionDBData = {
  date: string;
  name: string;
  laps: string[] | number[];
};

export enum Heat {
  HEAT_ONE = "HEAT_ONE",
  HEAT_TWO = "HEAT_TWO",
}

export type SessionData = {
  laps: ChartType;
  name: string;
  date: string;
};

export type ChartType = {
  [Heat.HEAT_ONE]?: number;
  [Heat.HEAT_TWO]?: number;
  name: string;
}[];

export type Res = {
  [key: string]: {
    [key: number]: number[][];
  };
};
