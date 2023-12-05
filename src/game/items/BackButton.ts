import { Game } from "game-engine/Game";
import { Item } from "game-engine/items/Item";
import { IdOrScene } from "game-engine/scenes";

type BackButtonConfig = {
  id: string;
  scene: IdOrScene;
  backScene: IdOrScene;
};

export class BackButton extends Item {
  constructor(game: Game, { id, scene, backScene }: BackButtonConfig) {
    super(game, {
      id,
      attributes: {
        image: "backButton",
        classes: ["clickable"],
      },
      shape: [
        [0, 0],
        [130, 0],
        [130, 50],
        [0, 50],
      ],
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

    const _scene = typeof scene === "string" ? this.game.scenes.get(scene) : scene;

    _scene.on("Esc", () => {
      game.sounds.play("button");
      game.scenes.show(backScene);
    });
  }

  static create(game: Game, config: BackButtonConfig) {
    return game.items.add(new BackButton(game, config));
  }

  static get defaultPosition() {
    return {
      top: 781,
      left: 1375,
    };
  }
}
