import Item from "game-engine/items/Item";

export default class Door extends Item {
  static create(game, { id, scene, backScene }) {
    const backButtonItem = new this(game, {
      id,
      attributes: {
        image: "backButton",
        classes: ["clickable"],
      },
      coords: {
        shape: [
          [0, 0],
          [130, 0],
          [130, 50],
          [0, 50],
        ],
      },
      events: {
        click: () => {
          if (game.equipment.isGrabbing) {
            return;
          }

          game.sounds.play("button");
          game.scenes.show(backScene);
        },
      },
    });

    scene.on("Esc", () => {
      game.sounds.play("button");
      game.scenes.show(backScene);
    });

    return game.items.add(backButtonItem);
  }

  static get defaultPosition() {
    return {
      top: 781,
      left: 1375,
    };
  }
}
