export default {
  on(eventName, callback) {
    this._events = this._events || new Map();

    const callbacks = this._events.get(eventName) || [];

    callbacks.push(callback);
    this._events.set(eventName, callbacks);
  },

  off(eventName, callback) {
    if (!this._events.has(eventName)) {
      return;
    }

    if (!callback) {
      this._events.delete(eventName);

      return;
    }

    let callbacks = this._events.get(eventName);

    if (callbacks.includes(callback)) {
      callbacks = callbacks.filter((cb) => cb !== callback);
    }

    if (!callbacks.length) {
      this._events.delete(eventName);
    } else {
      this._events.set(eventName, callbacks);
    }
  },

  fire(eventName, ...args) {
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
  },
};

class EventInfo {
  constructor(off) {
    this.off = off;
    this.return = undefined;
  }
}
