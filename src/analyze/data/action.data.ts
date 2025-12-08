import {
  IAmbiguities,
  ILegalIssues,
  IRecommendation,
  IRisk,
} from '../interfaces/ai-answer.interface';
import { AnalysisNavigation } from '../utils/navigation.utils';

const buildAction = (action: string) => ({
  action,
  open: `open:${action}`,
  close: `close:${action}`,
});

export const ACTION_DATA = {
  risks: {
    name: 'Риски',
    ...buildAction('risks'),
    render: <T>(data: T) => AnalysisNavigation.defRender(data as IRisk[]),
  },
  ambiguities: {
    name: 'Двусмысленности',
    ...buildAction('ambiguities'),
    render: <T>(data: T) => AnalysisNavigation.defRender(data as IAmbiguities[]),
  },
  legal_issues: {
    name: 'Потенциальные нарушения',
    ...buildAction('legal_issues'),
    render: <T>(data: T) => AnalysisNavigation.defRender(data as ILegalIssues[]),
  },
  missing_clauses: {
    name: 'Пропущенные пункты',
    ...buildAction('missing_clauses'),
    render: <T>(data: T) => AnalysisNavigation.missingRender(data as string[]),
  },
  recommendations: {
    name: 'Рекомендации',
    ...buildAction('recommendations'),
    render: <T>(data: T) => AnalysisNavigation.recommendRender(data as IRecommendation[]),
  },
} as const;

export const NAVIGATION_DATA = [
  ACTION_DATA.risks,
  ACTION_DATA.ambiguities,
  ACTION_DATA.legal_issues,
  ACTION_DATA.missing_clauses,
  ACTION_DATA.recommendations,
] as const;
