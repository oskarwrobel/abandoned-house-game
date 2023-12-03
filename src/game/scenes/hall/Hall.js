import Scene from "../../../game-engine/scenes/Scene";
import Door from "../../items/Door";
import { wait } from "../../../game-engine/utils";

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
        classes: ["clickable"],
      },
      coords: {
        top: 225,
        left: 723,
        shape: [
          [0, 0],
          [153, 0],
          [153, 200],
          [0, 200],
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

    hallScene.createItem({
      id: "door-1",
      attributes: {
        image: "hallLeftDoor",
      },
      coords: {
        top: 278,
        left: 103,
        shape: [
          [0, 585],
          [0, 0],
          [217, 0],
          [217, 475],
        ],
      },
    });
    hallScene.addItem(
      Door.create(game, {
        id: "door-1-inside",
        shape: [
          [0, 538],
          [0, 0],
          [172, 0],
          [172, 458],
        ],
        isLocked: true,
      }),
      {
        top: 287,
        left: 103,
      },
    );

    hallScene.createItem({
      id: "door-2",
      attributes: {
        image: "hallLeftDoorOpen",
      },
      coords: {
        top: 279,
        left: 425,
        shape: [
          [0, 432],
          [0, 0],
          [160, 0],
          [160, 350],
        ],
      },
    });
    hallScene.addItem(
      Door.create(game, {
        id: "door-2-inside",
        shape: [
          [0, 396],
          [0, 0],
          [127, 0],
          [127, 337],
        ],
        target: "room-basement",
      }),
      {
        top: 286,
        left: 425,
      },
    );

    hallScene.createItem({
      id: "door-3",
      attributes: {
        image: "hallRightDoor",
      },
      coords: {
        top: 279,
        left: 1023,
        shape: [
          [0, 350],
          [0, 0],
          [160, 0],
          [160, 432],
        ],
      },
    });
    hallScene.addItem(
      Door.create(game, {
        id: "door-3-inside",
        shape: [
          [0, 337],
          [0, 0],
          [127, 0],
          [127, 396],
        ],
        isLocked: true,
      }),
      {
        top: 286,
        left: 1056,
      },
    );

    hallScene.createItem({
      ...door4baseProps,
      attributes: { image: "hallRightDoor" },
    });
    hallScene.addItem(
      Door.create(game, {
        ...door4insideBaseProps,
        isLocked: true,
        keys: ["hall-key"],
        events: {
          unlock: async () => {
            hallScene.removeItem("door-4-inside");
            await wait(2000);

            hallScene.removeItem("door-4");
            hallScene.createItem({
              ...door4baseProps,
              attributes: { image: "hallRightDoorOpen" },
            });
            hallScene.addItem(
              Door.create(game, {
                ...door4insideBaseProps,
                target: "room-light",
              }),
              door4insidePosition,
            );
          },
        },
      }),
      door4insidePosition,
    );

    return game.scenes.add(hallScene);
  }
}

const door4baseProps = {
  id: "door-4",
  coords: {
    top: 277,
    left: 1284,
    shape: [
      [0, 475],
      [0, 0],
      [217, 0],
      [217, 585],
    ],
  },
};
const door4insideBaseProps = {
  id: "door-4-inside",
  shape: [
    [0, 458],
    [0, 0],
    [172, 0],
    [172, 538],
  ],
};
const door4insidePosition = {
  top: 287,
  left: 1329,
};
