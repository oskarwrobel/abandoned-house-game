import { Game } from "game-engine/Game";

import assetsImages from "./game/assets/images";
import assetsSounds from "./game/assets/sounds";
import { start } from "./game/game";
import { hideLoader, showLoader } from "./loader/loader";

import "./main.css";
import "./game/game.css";

const game = new Game({
  resolution: { x: 1600, y: 900 },
  images: assetsImages,
  sounds: assetsSounds,
});

showLoader();
Promise.all([game.sounds.preload(), game.images.preload()]).then(() => {
  hideLoader();

  start(game);

  // Adjust game size each time screen properties have changed.
  window.addEventListener("resize", () => game.update());
  window.addEventListener("orientationchange", () => game.update());

  // Append game to the DOM.
  document.querySelector("#root").appendChild(game.element);
});
