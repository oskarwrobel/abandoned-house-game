import { Scene } from "game-engine/scenes";

export default class RoomBasementClosetClosed extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const scene = new this(game, {
      id: "room-basement-closet-closed",
      image: "sceneRoomBasementClosetClosed",
    });

    scene.createItem({
      id: "room-basement-closet-unlock-key",
      attributes: {
        classes: ["clickable"],
      },
      coords: {
        top: 484,
        left: 817,
        shape: [
          [0, 0],
          [96, 0],
          [96, 105],
          [0, 105],
        ],
      },
      events: {
        click: async () => {
          game.sounds.play("button");
          game.scenes.show("room-basement-closet-closed-unlock-key");
        },
      },
    });

    scene.addBackButton("room-basement");

    return game.scenes.add(scene);
  }
}
