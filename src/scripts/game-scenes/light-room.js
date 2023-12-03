import createBackButton from "../game-items/createbackbutton";
import { backButtonCoords } from "../consts";

/**
 * @param {Game} game
 */
export function createLightRoomScene(game) {
  const { scenes } = game;

  const lightRoomScene = scenes.create({
    id: "room-light",
    image: "sceneRoomLight",
  });

  lightRoomScene.addItem(
    createBackButton(game, {
      id: "room-light-back",
      backScene: scenes.get("hall"),
    }),
    backButtonCoords,
  );
}
