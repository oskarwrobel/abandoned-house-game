import { Game } from "game-engine/Game";
import { IdOrItem, ItemConfig } from "game-engine/items";

import { BackButton } from "../../game/items/BackButton";
import { createSvgElement, Emitter, mix } from "../utils";

export type SceneConfig = {
  id: string;
  image: string;
};

export interface Scene extends Emitter {}
export class Scene {
  game: Game;
  id: string;
  element: SVGElement;

  constructor(game: Game, { id, image }: SceneConfig) {
    this.game = game;
    this.id = id;
    this.element = this.render({ id, image });
  }

  createItem(itemConfig: ItemConfig) {
    const item = this.game.items.create(itemConfig);
    this.addItem(item, itemConfig.position);
    return item;
  }

  addItem(idOrItem: IdOrItem, position: { left: number; top: number }) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;

    item.element.remove();
    Object.assign(item, position);
    this.element.appendChild(item.element);
  }

  removeItem(idOrItem: IdOrItem) {
    this.game.items.remove(idOrItem);
  }

  // TODO: Engine function should not know anything about game items
  addBackButton(backScene: string) {
    this.addItem(
      BackButton.create(this.game, {
        id: `${this.id}-back`,
        scene: this,
        backScene,
      }),
      BackButton.defaultPosition,
    );
  }

  private render({ id, image }: SceneConfig) {
    const element = createSvgElement("svg");

    if (this.game.images.get(image)) {
      image = this.game.images.get(image);
    }

    element.id = `scene-${id}`;
    element.classList.add("scene");
    element.style.backgroundImage = `url(${image})`;

    return element;
  }
}

mix(Scene, Emitter);
