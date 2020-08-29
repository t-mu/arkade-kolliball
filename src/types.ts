export enum Court {
  LEFT,
  RIGHT,
}

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