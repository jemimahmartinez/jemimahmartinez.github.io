export interface ReportIndexEntry {
  id: string;
  label: string;
  publishedAt: string;
  summary?: string;
}

export interface QuarterMetrics {
  id: string;
  quarter: string;
  dateRange: { start: string; end: string };
  github: {
    prsMerged: number;
    commits: number;
    reviews: number;
    linesChanged: number;
  };
  jira: {
    ticketsClosed: number;
    storyPoints: number;
  };
  confluence: {
    pagesAuthored: number;
    pagesEdited: number;
  };
}

export type LadderGapStatus = "met" | "developing" | "gap";

export interface LadderGap {
  currentLevel: string;
  targetLevel: string;
  asOf: string;
  gaps: Array<{
    competency: string;
    status: LadderGapStatus;
    notes?: string;
  }>;
}
