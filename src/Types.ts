export type SessionDBData = {
  date: string;
  name: string;
  laps: string[] | number[];
};

export enum Session {
  HEAT_ONE = "HEAT_ONE",
  HEAT_TWO = "HEAT_TWO",
}

export type SessionData = {
  laps: ChartType;
  name: string;
  date: string;
};

export type ChartType = {
  [Session.HEAT_ONE]?: number;
  [Session.HEAT_TWO]?: number;
  name: string;
}[];
