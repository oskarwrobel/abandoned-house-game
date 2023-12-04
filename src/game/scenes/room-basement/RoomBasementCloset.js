import { Scene } from "game-engine/scenes";

import Flashlight from "../../items/Flashlight";

export default class RoomBasementCloset extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const scene = new this(game, {
      id: "room-basement-closet",
      image: "sceneRoomBasementCloset",
    });

    scene.createItem({
      id: "rubber-duck",
      attributes: {
        classes: ["clickable"],
      },
      coords: {
        top: 288,
        left: 594,
        shape: [
          [17, 9],
          [33, 12],
          [52, 0],
          [72, 7],
          [79, 26],
          [72, 47],
          [101, 50],
          [116, 45],
          [121, 53],
          [112, 78],
          [78, 106],
          [26, 102],
          [6, 90],
          [0, 71],
          [11, 45],
          [26, 37],
          [12, 22],
        ],
      },
      events: {
        click: () => game.sounds.play("rubberDuck"),
      },
    });

    scene.createItem({
      id: "flashlight-big",
      attributes: {
        classes: ["clickable"],
        image: "flashlightBig",
      },
      coords: {
        top: 570,
        left: 640,
        shape: [
          [20, 0],
          [78, 12],
          [87, 27],
          [276, 44],
          [287, 56],
          [283, 93],
          [270, 100],
          [81, 82],
          [70, 95],
          [10, 96],
          [0, 47],
        ],
      },
      events: {
        click: () => {
          game.sounds.play("button");
          scene.removeItem("flashlight-big");
          Flashlight.create(game);
          game.equipment.addItem("flashlight");
        },
      },
    });

    scene.addBackButton("room-basement");

    return game.scenes.add(scene);
  }
}
