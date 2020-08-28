export type CourtType = 'left' | 'right';

export type CharacterAnimations = {
  walk: string,
  idle: string,
  jump: string,
}

export enum KeyboardKey {
  M = 'M',
  P = 'P',
}

export type HotKey = {
  key: KeyboardKey;
  action: () => void;
}