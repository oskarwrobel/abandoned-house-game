import Game from "./game-engine/game";
import Flashlight from "./game-items/flashlight";
import createDoor from "./game-items/createdoor";
import createBackButton from "./game-items/createbackbutton";
import assetsImages from "./images";
import assetsSounds from "./sounds";

import "../styles/app.css";
import "../styles/loader.css";

const backButtonCoords = {
  top: 625,
  left: 1100,
};

// Creates a game.
const game = new Game({
  resolution: "1280x720",
  images: assetsImages,
  sounds: assetsSounds,
});
const { scenes, items, sounds, images, equipment } = game;

const timerId = setTimeout(() => {
  document.body.classList.add("loading");
  document.querySelector("#root").classList.add("loader");
}, 100);

Promise.all([sounds.preload(), images.preload()]).then(() => {
  clearTimeout(timerId);
  document.body.classList.remove("loading");
  document.querySelector("#root").classList.remove("loader");

  // Creates main hall scene
  // ---------------------------------------------------------------------------------------------------------------------------------- //
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

  // Creates paint scene
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  const hallPaintScene = scenes.create({
    id: "hall-paint",
    image: "sceneHallWall",
  });

  hallPaintScene.addItem(
    createBackButton(game, {
      id: "hall-paint-back",
      backScene: hallScene,
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

  // Room with basement scene
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  const roomBasementScene = scenes.create({
    id: "room-with-basement",
    image: "sceneRoomBasement",
  });

  roomBasementScene.addItem(
    createBackButton(game, {
      id: "room-with-basement-back",
      backScene: hallScene,
    }),
    backButtonCoords,
  );

  // Light room scene
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  const lightRoomScene = scenes.create({
    id: "room-light",
    image: "sceneRoomLight",
  });

  lightRoomScene.addItem(
    createBackButton(game, {
      id: "room-light-back",
      backScene: hallScene,
    }),
    backButtonCoords,
  );

  // Adds flashlight to the storage (just to test it).
  items.add(new Flashlight(game));
  equipment.addItem("flashlight");

  // Shows main hall scene an initial scene.
  game.scenes.show("hall");

  // Append game to the DOM.
  document.querySelector("#root").appendChild(game.element);

  // Adjust game size each time screen has changed.
  window.addEventListener("resize", () => game.update());
  window.addEventListener("orientationchange", () => game.update());
});
