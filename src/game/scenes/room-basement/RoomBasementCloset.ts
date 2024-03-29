import { Game } from "game-engine/Game";
import { Scene } from "game-engine/scenes";

import { FlashlightStash } from "../../items/FlashlightStash";

export default class RoomBasementCloset extends Scene {
  static create(game: Game) {
    const scene = new this(game, {
      id: "room-basement-closet",
      image: "sceneRoomBasementCloset",
    });

    scene.createItem({
      id: "rubber-duck",
      attributes: {
        classes: ["clickable"],
      },
      position: {
        top: 288,
        left: 594,
      },
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
      position: {
        top: 570,
        left: 640,
      },
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
      events: {
        click: () => {
          game.sounds.play("button");
          scene.removeItem("flashlight-big");
          FlashlightStash.create(game);
          game.equipment.addItem("flashlight-stash");
        },
      },
    });

    scene.addBackButton("room-basement");

    return game.scenes.add(scene);
  }
}
