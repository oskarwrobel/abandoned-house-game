type Attributes = { [key: string]: unknown };

export function createElement(name: string, attributes?: Attributes) {
  return _createElement(false, name, attributes) as HTMLElement;
}

export function createSvgElement(name: string, attributes?: Attributes) {
  return _createElement(true, name, attributes) as SVGElement;
}

function _createElement(isNameSpaced: boolean, name: string, attributes: Attributes = {}) {
  let element;

  if (isNameSpaced) {
    element = document.createElementNS("http://www.w3.org/2000/svg", name);
  } else {
    element = document.createElement(name);
  }

  for (const name of Object.keys(attributes)) {
    element.setAttribute(name, String(attributes[name]));
  }

  return element;
}
