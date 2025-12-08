import { Injectable } from '@nestjs/common';
import { State } from 'src/utils/state/state.utils';
import { IStatusState } from '../interfaces/status-state.interface';

@Injectable()
export class StatusState extends State<IStatusState> {
  constructor() {
    super({
      isProcessing: false,
    });
  }
}
