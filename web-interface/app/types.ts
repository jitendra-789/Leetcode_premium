export interface Company {
  name: string;
}

export interface Problem {
  Difficulty: string;
  Title: string;
  Frequency: number;
  "Acceptance Rate": number;
  Link: string;
  Topics: string;
}

export type Duration = "Thirty Days" | "Three Months" | "Six Months" | "More Than Six Months" | "All";
