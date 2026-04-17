export interface Stat {
  id: string;
  value: string | number;
  unit?: string;
  year: string;
  description: string;
  descriptionTa?: string;
  source: string;
  sourceUrl: string;
  domain: string;
  trend?: 'up' | 'down' | 'neutral';
  isNegative?: boolean;
}

export interface BeforeAfter {
  metric: string;
  metricTa?: string;
  before: { value: string | number; unit?: string; year: string; party: string };
  after: { value: string | number; unit?: string; year: string; party: string };
  source: string;
  sourceUrl: string;
}
