import { Injectable } from '@nestjs/common';
import { IGlobalState } from './types/global-state.types';

@Injectable()
export class GlobalStateService {
  private readonly deafultState: IGlobalState = {
    isUpdating: false,
  };

  private readonly state = new Map<string, IGlobalState>();

  getState(id: string): IGlobalState {
    const state = this.state.get(id);
    if (!state) return this.deafultState;
    return state;
  }

  setState(id: string, state: Partial<IGlobalState>): void {
    const prev = this.getState(id);
    this.state.set(id, { ...prev, ...state });
  }
}
