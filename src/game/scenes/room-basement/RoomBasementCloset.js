import Scene from "../../../game-engine/scenes/Scene";
import BackButton from "../../items/BackButton";

export default class RoomBasementCloset extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const roomBasementScene = new this(game, {
      id: "room-basement-closet",
      image: "sceneRoomBasementCloset",
    });

    roomBasementScene.addItem(
      BackButton.create(game, {
        id: "room-basement-closet-back",
        scene: roomBasementScene,
        backScene: game.scenes.get("room-basement"),
      }),
      BackButton.defaultPosition,
    );

    return game.scenes.add(roomBasementScene);
  }
}
