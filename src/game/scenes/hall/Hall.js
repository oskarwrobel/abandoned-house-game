import Scene from "../../../game-engine/scenes/Scene";
import Door from "../../items/Door";

export default class Hall extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const { scenes, equipment, sounds } = game;

    const hallScene = new this(game, {
      id: "hall",
      image: "sceneHall",
    });

    hallScene.createItem({
      id: "hall-paint",
      attributes: {
        image: "hallPaint",
        classes: ["searchable"],
      },
      coords: {
        top: 180,
        left: 579,
        shape: [
          [0, 0],
          [123, 0],
          [123, 160],
          [0, 160],
        ],
      },
      events: {
        click: () => {
          if (equipment.isGrabbing) {
            return;
          }

          sounds.play("button");
          scenes.show("hall-paint");
        },
      },
    });

    hallScene.addItem(
      Door.create(game, {
        id: "door-a",
        shape: [
          [0, 432],
          [0, 0],
          [141, 0],
          [141, 373],
        ],
        isLocked: true,
      }),
      {
        top: 228,
        left: 82,
      },
    );

    hallScene.addItem(
      Door.create(game, {
        id: "door-b",
        shape: [
          [0, 316],
          [0, 0],
          [104, 0],
          [104, 272],
        ],
        target: "room-with-basement",
      }),
      {
        top: 226,
        left: 340,
      },
    );

    hallScene.addItem(
      Door.create(game, {
        id: "door-c",
        shape: [
          [0, 272],
          [0, 0],
          [102, 0],
          [102, 316],
        ],
        isLocked: true,
      }),
      {
        top: 226,
        left: 840,
      },
    );

    hallScene.addItem(
      Door.create(game, {
        id: "door-d",
        scene: hallScene,
        shape: [
          [0, 371],
          [0, 0],
          [140, 0],
          [140, 432],
        ],
        isLocked: true,
        target: "room-light",
        keys: ["hall-key"],
      }),
      {
        top: 228,
        left: 1060,
      },
    );

    return game.scenes.add(hallScene);
  }
}
