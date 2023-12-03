import Scene from "../../game-engine/scenes/Scene";
import BackButton from "../items/BackButton";

export default class RoomWithBasement extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const roomBasementScene = new this(game, {
      id: "room-with-basement",
      image: "sceneRoomBasement",
    });

    roomBasementScene.addItem(
      BackButton.create(game, {
        id: "room-with-basement-back",
        backScene: game.scenes.get("hall"),
      }),
      BackButton.defaultPosition,
    );

    return game.scenes.add(roomBasementScene);
  }
}
