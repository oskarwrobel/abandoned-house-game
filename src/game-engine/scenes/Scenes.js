import Scene from "./Scene";
import { createElement } from "../utils/createelement";

export default class Scenes {
  /**
   * @param {Game} game
   */
  constructor(game) {
    /**
     * @type {Game}
     */
    this.game = game;

    /**
     * @type {Scene|null}
     */
    this.current = null;

    /**
     * @type {HTMLElement}
     */
    this.element = createElement("div", { class: "scene-wrapper" });

    /**
     * @private
     * @type {Map<String,Scene>}
     */
    this._idToScene = new Map();
  }

  /**
   * @param {Object} data
   * @param {String} data.id
   * @param {String} data.image
   * @returns {Scene}
   */
  create({ id, image }) {
    const scene = new Scene(this.game, { id, image });
    this.add(scene);
    return scene;
  }

  /**
   * @param {Scene} scene
   * @returns {Scene}
   */
  add(scene) {
    if (this._idToScene.has(scene.id)) {
      throw new Error("Cannot add the same scene more than once.");
    }

    this._idToScene.set(scene.id, scene);

    return scene;
  }

  show(idOrScene) {
    if (typeof idOrScene === "string") {
      idOrScene = this.get(idOrScene);
    }

    if (this.current) {
      this.current.fire("exit");
      this.current.element.remove();
    }

    this.element.appendChild(idOrScene.element);
    this.current = idOrScene;

    idOrScene.fire("enter");
  }

  get(id) {
    if (!this._idToScene.has(id)) {
      throw new Error("Scene is not defined.");
    }

    return this._idToScene.get(id);
  }
}
