import Scene from "../../game-engine/scenes/Scene";
import BackButton from "../items/BackButton";

export default class LightRoom extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const lightRoomScene = new this(game, {
      id: "room-light",
      image: "sceneRoomLight",
    });

    lightRoomScene.addItem(
      BackButton.create(game, {
        id: "room-light-back",
        scene: lightRoomScene,
        backScene: game.scenes.get("hall"),
      }),
      BackButton.defaultPosition,
    );

    return game.scenes.add(lightRoomScene);
  }
}
