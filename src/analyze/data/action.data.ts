import { AnalysisNavigation } from '../utils/navigation.utils';

export const ACTION_DATA = {
  risk: AnalysisNavigation.buildAction('risk'),
  ambiguities: AnalysisNavigation.buildAction('ambiguities'),
  legal_issues: AnalysisNavigation.buildAction('legal_issues'),
  missing: AnalysisNavigation.buildAction('missing'),
  recommends: AnalysisNavigation.buildAction('recommends'),
} as const;

export const NAVIGATION_DATA = [
  ACTION_DATA.risk,
  ACTION_DATA.ambiguities,
  ACTION_DATA.legal_issues,
  ACTION_DATA.missing,
  ACTION_DATA.recommends,
] as const;
