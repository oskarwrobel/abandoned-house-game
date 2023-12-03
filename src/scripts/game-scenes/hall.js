import createDoor from "../game-items/createdoor";
import createBackButton from "../game-items/createbackbutton";
import { backButtonCoords } from "../consts";

/**
 * @param {Game} game
 */
export function createHallScene(game) {
  const { scenes, equipment, sounds } = game;

  const hallScene = scenes.create({
    id: "hall",
    image: "sceneHall",
  });

  // Adds pain to main hall scene.
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
    createDoor(game, {
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
    createDoor(game, {
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
    createDoor(game, {
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
    createDoor(game, {
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

  return hallScene;
}

/**
 * @param {Game} game
 */
export function createHallPaintScene(game) {
  const { scenes, equipment, sounds, items } = game;

  const hallPaintScene = scenes.create({
    id: "hall-paint",
    image: "sceneHallWall",
  });

  hallPaintScene.addItem(
    createBackButton(game, {
      id: "hall-paint-back",
      backScene: scenes.get("hall"),
    }),
    backButtonCoords,
  );

  hallPaintScene.createItem({
    id: "hall-key",
    attributes: {
      image: "key",
      classes: ["clickable"],
      droppable: true,
    },
    coords: {
      top: 450,
      left: 730,
      shape: [
        [0, 0],
        [52, 0],
        [52, 130],
        [0, 130],
      ],
    },
    events: {
      click: () => {
        if (equipment.isGrabbing || equipment.hasItem("hall-key")) {
          return;
        }

        const item = items.get("hall-key");

        sounds.play("button");
        item.shape = [
          [0, 0],
          [21, 0],
          [21, 52],
          [0, 52],
        ];
        equipment.addItem("hall-key", { droppable: true });
      },
    },
  });

  hallPaintScene.createItem({
    id: "hall-paint-large",
    attributes: {
      image: "hallPaint",
      classes: ["clickable", "hall-paint"],
    },
    coords: {
      left: 420,
      top: 80,
      shape: [
        [0, 0],
        [440, 0],
        [440, 570],
        [0, 570],
      ],
    },
    events: {
      click: () => {
        if (equipment.isGrabbing) {
          return;
        }

        const paintLarge = items.get("hall-paint-large");
        const paint = items.get("hall-paint");

        if (paintLarge.angle) {
          paintLarge.rotate(0, 220, 10);
          paint.rotate(0, 25, 3);
        } else {
          paintLarge.rotate(30, 220, 10);
          paint.rotate(18, 25, 5);
        }

        sounds.play("swipe");
      },
    },
  });
}
