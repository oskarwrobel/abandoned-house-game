import Scene from "../../../game-engine/scenes/Scene";
import { wait } from "../../../game-engine/utils";

export default class RoomBasement extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const scene = new this(game, {
      id: "room-basement",
      image: "sceneRoomBasement",
    });

    const closet = scene.createItem({
      id: "room-basement-closet",
      attributes: {
        classes: ["clickable"],
      },
      coords: {
        top: 224,
        left: 1250,
        shape: [
          [0, 16],
          [105, 0],
          [170, 7],
          [170, 178],
          [105, 192],
          [0, 160],
        ],
      },
      events: {
        click: async () => {
          if (closet.states.opening) {
            return;
          }

          if (closet.states.unlocked) {
            closet.states.opening = true;
            game.sounds.play("closetDoors");
            await wait(500);
            game.scenes.show("room-basement-closet");
            closet.states.opening = false;
          } else {
            game.sounds.play("button");
            game.scenes.show("room-basement-closet-closed");
          }
        },
      },
    });

    scene.addBackButton("hall");

    return game.scenes.add(scene);
  }
}
