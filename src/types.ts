import CpuCharacter from "./objects/cpuCharacter";
import PlayerCharacter from "./objects/playerCharacter";

// TODO: come up with a better name?
export enum SceneName {
  GAME = 'GameScene',
  MENU = 'MenuScene',
  INFO = 'InfoScene',
  PAUSE = 'PauseScene',
  PRELOAD = 'PreloadScene',
}

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
  ENTER = 'ENTER',
  ESC = 'ESC',
}

export type HotKey = {
  key: KeyboardKey;
  action: () => void;
}

export type TeamMember = PlayerCharacter | CpuCharacter;

export type Position = {
  x: number;
  y: number;
}
