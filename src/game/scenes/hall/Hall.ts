import { Game } from "game-engine/Game";
import { Scene } from "game-engine/scenes";
import { wait } from "game-engine/utils";

import { Door, DoorConfig } from "../../items/Door";

export default class Hall extends Scene {
  static create(game: Game) {
    const { scenes, equipment, sounds } = game;

    const scene = new this(game, {
      id: "hall",
      image: "sceneHall",
    });

    scene.createItem({
      id: "hall-paint",
      attributes: {
        image: "hallPaint",
        classes: ["clickable"],
      },
      position: {
        top: 225,
        left: 723,
      },
      shape: [
        [0, 0],
        [153, 0],
        [153, 200],
        [0, 200],
      ],
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

    scene.createItem({
      id: "door-1",
      attributes: {
        image: "hallLeftDoor",
      },
      position: {
        top: 278,
        left: 103,
      },
      shape: [
        [0, 585],
        [0, 0],
        [217, 0],
        [217, 475],
      ],
    });
    scene.addItem(
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

    scene.createItem({
      id: "door-2",
      attributes: {
        image: "hallLeftDoorOpen",
      },
      position: {
        top: 279,
        left: 425,
      },
      shape: [
        [0, 432],
        [0, 0],
        [160, 0],
        [160, 350],
      ],
    });
    scene.addItem(
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

    scene.createItem({
      id: "door-3",
      attributes: {
        image: "hallRightDoor",
      },
      position: {
        top: 279,
        left: 1023,
      },
      shape: [
        [0, 350],
        [0, 0],
        [160, 0],
        [160, 432],
      ],
    });
    scene.addItem(
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

    scene.createItem({
      ...door4baseProps,
      attributes: { image: "hallRightDoor" },
    });
    scene.addItem(
      Door.create(game, {
        ...door4insideBaseProps,
        isLocked: true,
        keys: ["hall-key"],
        events: {
          unlock: async () => {
            scene.removeItem("door-4-inside");
            await wait(2000);

            scene.removeItem("door-4");
            scene.createItem({
              ...door4baseProps,
              attributes: { image: "hallRightDoorOpen" },
            });
            scene.addItem(
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

    return game.scenes.add(scene);
  }
}

const door4baseProps: DoorConfig = {
  id: "door-4",
  position: {
    top: 277,
    left: 1284,
  },
  shape: [
    [0, 475],
    [0, 0],
    [217, 0],
    [217, 585],
  ],
};
const door4insideBaseProps: DoorConfig = {
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
