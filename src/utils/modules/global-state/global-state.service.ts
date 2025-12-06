import { Injectable } from '@nestjs/common';
import { IGlobalState } from './types/global-state.types';
import { State } from 'src/utils/state/state.utils';

@Injectable()
export class GlobalStateService extends State<IGlobalState> {
  constructor() {
    super({ isUpdating: false });
  }
}
