import Scene from "../../../game-engine/scenes/Scene";
import BackButton from "../../items/BackButton";

import "./HallPaint.css";
export default class HallPaint extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const { scenes, equipment, sounds, items } = game;

    const hallPaintScene = new this(game, {
      id: "hall-paint",
      image: "sceneHallWall",
    });

    hallPaintScene.addItem(
      BackButton.create(game, {
        id: "hall-paint-back",
        backScene: scenes.get("hall"),
      }),
      BackButton.defaultPosition,
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

    return game.scenes.add(hallPaintScene);
  }
}
