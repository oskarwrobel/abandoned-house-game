import { Game } from "game-engine/Game";

import { createElement } from "../utils";
import { Scene, SceneConfig } from "./Scene";

export type IdOrScene = string | Scene;

export class Scenes {
  game: Game;
  current: Scene;
  element: HTMLElement;
  private sceneById: Map<string, Scene> = new Map();

  constructor(game: Game) {
    this.game = game;
    this.element = createElement("div", { class: "scene-wrapper" });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.current?.fire("Esc");
      }
    });
  }

  create({ id, image }: SceneConfig) {
    const scene = new Scene(this.game, { id, image });
    this.add(scene);
    return scene;
  }

  add(scene: Scene) {
    if (this.sceneById.has(scene.id)) {
      throw new Error("Cannot add the same scene more than once");
    }

    this.sceneById.set(scene.id, scene);

    return scene;
  }

  show(idOrScene: IdOrScene) {
    if (typeof idOrScene === "string") {
      idOrScene = this.get(idOrScene);
    }

    if (this.current) {
      this.current.element.remove();
    }

    this.element.appendChild(idOrScene.element);
    this.current = idOrScene;
  }

  get(id: string) {
    if (!this.sceneById.has(id)) {
      throw new Error("Scene is not defined.");
    }

    return this.sceneById.get(id);
  }
}
