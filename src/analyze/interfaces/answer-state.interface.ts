import { ACTION_DATA } from '../data/action.data';
import { AIAnswer } from './ai-answer.interface';

export type TSection = (typeof ACTION_DATA)[keyof typeof ACTION_DATA];

export interface IAnswerState extends AIAnswer {
  currentPath: TSection | null;
}
