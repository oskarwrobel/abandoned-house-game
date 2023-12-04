export type Attributes = Record<string, unknown>;
export type States = Record<string, unknown>;

export type Shape = [number, number][];

export type Coords = {
  left: number;
  top: number;
  shape: Shape;
};

export type Events = {
  onClick?: () => void;
};
