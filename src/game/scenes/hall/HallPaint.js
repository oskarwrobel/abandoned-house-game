import Scene from "../../../game-engine/scenes/Scene";

import "./HallPaint.css";
export default class HallPaint extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const { equipment, sounds, items } = game;

    const scene = new this(game, {
      id: "hall-paint",
      image: "sceneHallWall",
    });

    scene.addBackButton("hall");

    scene.createItem({
      id: "hall-key",
      attributes: {
        image: "key",
        classes: ["clickable"],
        droppable: true,
      },
      coords: {
        top: 562,
        left: 912,
        shape: [
          [0, 0],
          [65, 0],
          [65, 150],
          [0, 150],
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
            [26, 0],
            [26, 65],
            [0, 65],
          ];
          equipment.addItem("hall-key", { droppable: true });
        },
      },
    });

    scene.createItem({
      id: "hall-paint-large",
      attributes: {
        image: "hallPaint",
        classes: ["clickable", "hall-paint"],
      },
      coords: {
        left: 525,
        top: 100,
        shape: [
          [0, 0],
          [550, 0],
          [550, 712],
          [0, 712],
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
            paintLarge.rotate(0, 275, 12);
            paint.rotate(0, 31, 4);
          } else {
            paintLarge.rotate(30, 275, 12);
            paint.rotate(18, 31, 4);
          }

          sounds.play("swipe");
        },
      },
    });

    return game.scenes.add(scene);
  }
}
