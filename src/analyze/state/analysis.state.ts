import { Injectable } from '@nestjs/common';
import { IAnswerState } from '../interfaces/answer-state.interface';
import { State } from 'src/utils/state/state.utils';

@Injectable()
export class AnalysisState extends State<IAnswerState> {
  constructor() {
    super({
      currentPath: null,
      ambiguities: [],
      legal_issues: [],
      missing_clauses: [],
      recommendations: [],
      risks: [],
      summary: { comment: '', reliability: '' },
    });
  }
}
