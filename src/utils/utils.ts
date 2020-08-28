import { HotKey } from "../types";

export const bindHotKeyToScene = ({ input }: Phaser.Scene) => ({ key, action }: HotKey): void => {
  input.keyboard.addKey(key);
  input.keyboard.on(`keydown-${key}`, action);
}
