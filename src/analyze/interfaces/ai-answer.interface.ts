export interface IRisk {
  text: string;
  quote: string;
}

export interface IAmbiguities extends IRisk {}

export interface ILegalIssues extends IRisk {}

export interface IRecommendation {
  problem: string;
  suggestion: string;
  quote: string;
}

export interface ISummary {
  reliability: string;
  comment: string;
}
export interface AIAnswer {
  risks: IRisk[];
  ambiguities: IAmbiguities[];
  legal_issues: ILegalIssues[];
  missing_clauses: string[];
  recommendations: IRecommendation[];
  summary: ISummary;
}
