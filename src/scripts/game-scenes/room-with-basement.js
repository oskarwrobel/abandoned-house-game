import createBackButton from "../game-items/createbackbutton";
import { backButtonCoords } from "../consts";

export function createRoomWithBasementScene(game) {
  const { scenes } = game;

  const roomBasementScene = scenes.create({
    id: "room-with-basement",
    image: "sceneRoomBasement",
  });

  roomBasementScene.addItem(
    createBackButton(game, {
      id: "room-with-basement-back",
      backScene: scenes.get("hall"),
    }),
    backButtonCoords,
  );

  return roomBasementScene;
}
