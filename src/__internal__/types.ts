export enum MarqueeScrollWhen {
  ALWAYS = 0,
  OVERFLOW = 100,
}

export enum MarqueeScrollDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

export type MarqueeState = {
  disableScroll: boolean;
};

export type MarqueeAnimationState = {
  lastRequestId: number | null;
  lastTickTime: number | null;
};

export type MarqueePositionState = {
  x: number;
};

export type MarqueeInnerRefs = {
  container: HTMLDivElement | null;
  inner: HTMLDivElement | null;
};
