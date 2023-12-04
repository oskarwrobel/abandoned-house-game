type Name = string;
type Path = string;

export default class Images {
  private nameToPath: Map<Name, Path> = new Map();

  constructor(imagesConfig: Record<Name, Path>) {
    for (const name of Object.keys(imagesConfig)) {
      this.nameToPath.set(name, imagesConfig[name]);
    }
  }

  preload() {
    const paths = Array.from(this.nameToPath.values());
    return Promise.all(paths.map(loadImage));
  }

  get(name: string) {
    return this.nameToPath.get(name);
  }
}

function loadImage(imagePath: string) {
  return new Promise((resolve, reject) => {
    const imageElement = new Image();

    imageElement.addEventListener("load", resolve);
    imageElement.addEventListener("error", reject);
    imageElement.src = imagePath;
  });
}
