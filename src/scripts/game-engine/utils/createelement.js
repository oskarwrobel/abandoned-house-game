export function createElement(name, attributes) {
  return _createElement(false, name, attributes);
}

export function createSvgElement(name, attributes) {
  return _createElement(true, name, attributes);
}

function _createElement(isNameSpaced, name, attributes = {}) {
  let element;

  if (isNameSpaced) {
    element = document.createElementNS("http://www.w3.org/2000/svg", name);
  } else {
    element = document.createElement(name);
  }

  for (const name of Object.keys(attributes)) {
    element.setAttribute(name, attributes[name]);
  }

  return element;
}
