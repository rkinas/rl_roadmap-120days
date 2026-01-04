export interface Paper {
  title: string;
  authors: string;
  year: number;
  url?: string;
}

export interface Resource {
  title: string;
  url: string;
}

export interface WeekPlan {
  week: number;
  title: string;
  goal: string;
  theory: string[];
  papers: {
    must: Paper[];
    optional: Paper[];
  };
  implementation: string[];
  jaxFocus: string[];
  controlQuestions: string[];
  resources?: Resource[];
}

export interface Capstone {
  id: string;
  title: string;
  track: string;
  hypothesis: string;
  baselines: string[];
  env: string;
  jaxAngle: string;
}
