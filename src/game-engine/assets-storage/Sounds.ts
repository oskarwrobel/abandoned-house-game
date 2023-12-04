declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const AudioContextConstructor = window.AudioContext ?? window.webkitAudioContext;
const audioContext = new AudioContextConstructor();

type Name = string;
type Path = string;

export default class Sounds {
  private nameToPath: Map<Name, Path> = new Map();
  private sounds: Map<Name, AudioBuffer> = new Map();

  constructor(initialData: Record<string, string>) {
    for (const name of Object.keys(initialData)) {
      this.nameToPath.set(name, initialData[name]);
    }
  }

  preload() {
    const entries = Array.from(this.nameToPath.entries());
    return Promise.all(entries.map(([name, path]) => this.loadSound(name, path)));
  }

  play(name: Name) {
    if (!this.sounds.has(name)) {
      throw new Error("Sound is not defined.");
    }

    const src = audioContext.createBufferSource();

    src.buffer = this.sounds.get(name);

    const gain = audioContext.createGain();

    src.connect(gain);
    gain.connect(audioContext.destination);
    gain.gain.value = 1;

    src.start();
  }

  private loadSound(name: Name, path: Path) {
    const loadingPromise = loadSound(path);
    loadingPromise.then((buffer) => this.sounds.set(name, buffer));
    return loadingPromise;
  }
}

function loadSound(path: Path): Promise<AudioBuffer> {
  return new Promise((resolve) => {
    const req = new XMLHttpRequest();

    req.addEventListener("load", () => {
      audioContext.decodeAudioData(req.response, resolve);
    });

    req.open("GET", path, true);
    req.responseType = "arraybuffer";
    req.send();
  });
}
