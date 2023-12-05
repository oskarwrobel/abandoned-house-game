import { Game } from "game-engine/Game";
import { Scene } from "game-engine/scenes";

export default class LightRoom extends Scene {
  static create(game: Game) {
    const scene = new this(game, {
      id: "room-light",
      image: "sceneRoomLight",
    });

    scene.addBackButton("hall");

    return game.scenes.add(scene);
  }
}
