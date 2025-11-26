import { Provider } from '@nestjs/common';
import { SCENE_OPTIOMS } from './consts/scene-options.const';
import { ISceneOptions } from './types/scene-options.types';

export class SceneOptions {
  static getProvider(options: ISceneOptions): Provider {
    return {
      provide: SCENE_OPTIOMS,
      useValue: options,
    };
  }
}
