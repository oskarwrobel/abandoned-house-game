import Game from "./game-engine/Game";
import assetsImages from "./game/assets/images";
import assetsSounds from "./game/assets/sounds";

import HallScene from "./game/scenes/hall/Hall";
import HallPaintScene from "./game/scenes/hall/HallPaint";
import RoomWithBasementScene from "./game/scenes/RoomWithBasement";
import LightRoomScene from "./game/scenes/LightRoom";

import Flashlight from "./game/items/Flashlight";

import { showLoader, hideLoader } from "./loader/loader";

import "./main.css";
import "./game/game.css";

// Creates a game.
const game = new Game({
  resolution: "1280x720",
  images: assetsImages,
  sounds: assetsSounds,
});

showLoader();
Promise.all([game.sounds.preload(), game.images.preload()]).then(() => {
  hideLoader();

  // Scenes
  HallScene.create(game);
  HallPaintScene.create(game);
  RoomWithBasementScene.create(game);
  LightRoomScene.create(game);

  // Set initial scene.
  game.scenes.show("hall");

  // Adds flashlight to the storage (just to test it).
  Flashlight.create(game);
  game.equipment.addItem("flashlight");

  // Adjust game size each time screen properties have changed.
  window.addEventListener("resize", () => game.update());
  window.addEventListener("orientationchange", () => game.update());

  // Append game to the DOM.
  document.querySelector("#root").appendChild(game.element);
});
