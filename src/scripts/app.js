import Game from "./game-engine/game";
import assetsImages from "./assets/images";
import assetsSounds from "./assets/sounds";

import Flashlight from "./game-items/flashlight";
import { createHallScene, createHallPaintScene } from "./game-scenes/hall";
import { createRoomWithBasementScene } from "./game-scenes/room-with-basement";
import { createLightRoomScene } from "./game-scenes/light-room";

import "../styles/app.css";
import "../styles/loader.css";

// Creates a game.
const game = new Game({
  resolution: "1280x720",
  images: assetsImages,
  sounds: assetsSounds,
});

// When game is served from cache, then not show loader.
const loadingTimerId = setTimeout(() => {
  document.body.classList.add("loading");
  document.querySelector("#root").classList.add("loader");
}, 100);

Promise.all([game.sounds.preload(), game.images.preload()]).then(() => {
  clearTimeout(loadingTimerId);
  document.body.classList.remove("loading");
  document.querySelector("#root").classList.remove("loader");

  // Hall scene
  // ---------------------------------------------------------------------------------------------------------------- //
  createHallScene(game);
  createHallPaintScene(game);

  // Room with basement scene
  // ---------------------------------------------------------------------------------------------------------------- //
  createRoomWithBasementScene(game);

  // Light room scene
  // ---------------------------------------------------------------------------------------------------------------- //
  createLightRoomScene(game);

  // Shows main hall scene an initial scene.
  game.scenes.show("hall");

  // Adds flashlight to the storage (just to test it).
  game.items.add(new Flashlight(game));
  game.equipment.addItem("flashlight");

  // Append game to the DOM.
  document.querySelector("#root").appendChild(game.element);

  // Adjust game size each time screen has changed.
  window.addEventListener("resize", () => game.update());
  window.addEventListener("orientationchange", () => game.update());
});
