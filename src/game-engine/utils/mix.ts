type Constructor = new (...args: unknown[]) => unknown;

export function mix(targetClass: Constructor, mixin: Constructor) {
  for (const key of Object.getOwnPropertyNames(mixin.prototype)) {
    if (key in targetClass.prototype) {
      continue;
    }

    Object.defineProperty(targetClass.prototype, key, Object.getOwnPropertyDescriptor(mixin.prototype, key));
  }
}
