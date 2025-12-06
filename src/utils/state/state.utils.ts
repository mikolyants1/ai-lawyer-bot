export interface IState<T> {
  getState(id: string): T;
  setState(id: string, state: Partial<T>): void;
}

export class State<T> implements IState<T> {
  private readonly defaultState: T;
  private readonly state: Map<string, T>;

  constructor(defaultState: T) {
    this.defaultState = defaultState;
    this.state = new Map<string, T>();
  }

  getState(id: string): T {
    const state = this.state.get(id);
    if (!state) return this.defaultState;
    return state;
  }

  setState(id: string, state: Partial<T>): void {
    const prev = this.getState(id);
    this.state.set(id, { ...prev, ...state });
  }
}
