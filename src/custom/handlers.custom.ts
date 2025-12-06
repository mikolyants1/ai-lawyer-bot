import { applyDecorators, Injectable, UseInterceptors } from '@nestjs/common';
import { Scene, Update } from 'nestjs-telegraf';
import { SessionUserInterceptor } from 'src/interceptors/session-user.interceptor';

export const UpdateHandler = () =>
  applyDecorators(Update(), Injectable(), UseInterceptors(SessionUserInterceptor));

export const SceneHandler = <T extends string>(scene: T) =>
  applyDecorators(Injectable(), Scene(scene));
