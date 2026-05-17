export interface HadithRecord {
  colIndex: number;
  groupNum: number;
  groupName: string;
  itemNum: number;
  text: string;
  fullHeader: string;
  recognizedCount: number;
  unrecognizedCount: number;
  percentage: number;
  rank: number;
  isPopular: boolean; // true if percentage >= 50
  arabicText?: string;
  englishText?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  percentage?: number;
}

export interface DemographicStats {
  gender: ChartDataPoint[];
  age: ChartDataPoint[];
  island: ChartDataPoint[];
}

export interface SourceStat {
  name: string;
  value: number;
  percentage: number;
  isDigital: boolean;
}

export interface SurveySummary {
  totalRespondents: number;
  topAgeGroup: string;
  topAgePercentage: number;
  topGender: string;
  topGenderPercentage: number;
  topIsland: string;
  topIslandPercentage: number;
  topSource: string;
  hadithsBelow50Count: number;
}

export interface SurveyData {
  summary: SurveySummary;
  hadiths: HadithRecord[];
  demographics: DemographicStats;
  sources: SourceStat[];
  sourcesTypeComparison: {
    digital: number;
    offline: number;
  };
}
