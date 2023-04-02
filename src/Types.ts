export type SessionDBData = {
  date: string;
  name: string;
  laps: string[] | number[];
};

export enum Session {
  SESSION_ONE = "SESSION_ONE",
  SESSION_TWO = "SESSION_TWO",
}

export type SessionData = {
  laps: ChartType;
  name: string;
  date: string;
};

export type ChartType = {
  name: string;
  [Session.SESSION_ONE]?: number;
  [Session.SESSION_TWO]?: number;
}[];
