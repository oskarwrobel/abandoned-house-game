import { Scene } from "game-engine/scenes";

export default class LightRoom extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const scene = new this(game, {
      id: "room-light",
      image: "sceneRoomLight",
    });

    scene.addBackButton("hall");

    return game.scenes.add(scene);
  }
}
