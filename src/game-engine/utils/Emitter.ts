export type Callback = (arg0: EventInfo, ...args: unknown[]) => void;

export class Emitter {
  _events: Map<string, Callback[]>;

  on(eventName: string, callback: Callback) {
    this._events ??= new Map();

    const callbacks = this._events.get(eventName) ?? [];
    callbacks.push(callback);
    this._events.set(eventName, callbacks);
  }

  off(eventName: string, callback: Callback) {
    if (!this._events.has(eventName)) {
      return;
    }

    if (!callback) {
      this._events.delete(eventName);
      return;
    }

    const callbacks = this._events.get(eventName).filter((cb: Callback) => cb !== callback);

    if (!callbacks.length) {
      this._events.delete(eventName);
    } else {
      this._events.set(eventName, callbacks);
    }
  }

  fire(eventName: string, ...args: unknown[]) {
    if (!this._events) {
      return;
    }

    const callbacks = this._events.get(eventName);

    if (!callbacks) {
      return;
    }

    let returnValue;

    for (const callback of callbacks) {
      const off = () => this.off(eventName, callback);
      const evt = new EventInfo(off);

      callback(evt, ...args);

      if (evt.return !== undefined) {
        returnValue = evt.return;
      }
    }

    return returnValue;
  }
}

class EventInfo {
  off: () => void;
  return: unknown;

  constructor(off: () => void) {
    this.off = off;
    this.return = undefined;
  }
}
