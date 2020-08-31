import { HotKey } from "../types";

export const bindHotKeyToScene = ({ key, action }: HotKey) => ({ input }: Phaser.Scene): void => {
  input.keyboard.addKey(key);
  input.keyboard.on(`keydown-${key}`, action);
}
