import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MarqueeAnimationState,
  MarqueeInnerRefs,
  MarqueePositionState,
  MarqueeScrollDirection,
  MarqueeScrollWhen,
  MarqueeState,
} from '__internal__/types';

function translateXCSS(numPx: number): string {
  return `translateX(${numPx}px)`;
}

const propTypes = {
  /**
     * Animation speed, in pixels per milliseconds.
     * Defaults to 0.04.
     */
  speed: PropTypes.number.isRequired,
  /**
     * Direction of movement; either 'left' or 'right'.
     * Defaults to 'right'.
     */
  direction: PropTypes.oneOf(Object.values(MarqueeScrollDirection)).isRequired,
  /**
     * Delay until animation starts, in milliseconds.
     * Defaults to three seconds.
     */
  delay: PropTypes.number.isRequired,
  /**
     * Horizontal margin between children, in pixels.
     * Defaults to 10px.
     */
  childMargin: PropTypes.number.isRequired,
  /**
     * Children to render.
     * Default is `null`.
     */
  children: PropTypes.node,
  /*
    * How to determine when scrolling is enabled
    * */
  scrollWhen: PropTypes.oneOf(Object.values(MarqueeScrollWhen)).isRequired,
};

export type MarqueeProps = PropTypes.InferProps<typeof propTypes>;

export default class Marquee extends Component<MarqueeProps, MarqueeState> {
  _animationState: MarqueeAnimationState = {
    lastRequestId: null,
    lastTickTime: 0,
  };

  _pos: MarqueePositionState = {
    x: 0,
  };

  _refs: MarqueeInnerRefs = {
    container: null,
    inner: null,
  };

  constructor(props: MarqueeProps) {
    super(props);

    this._setContainerRef = this._setContainerRef.bind(this);
    this._setInnerRef = this._setInnerRef.bind(this);
    this._tick = this._tick.bind(this);
    this._shouldAnimate = this._shouldAnimate.bind(this);
    this._getMarqueeFillPercent = this._getMarqueeFillPercent.bind(this);
  }

  ///////////////////////
  // Lifecycle methods //
  ///////////////////////

  componentDidMount(): void {
    this._resetPosition();
    this._requestAnimationWithDelay();
  }

  componentDidUpdate(): void {
    this._resetPosition();
    this._requestAnimationWithDelay();
  }

  componentWillUnmount(): void {
    if (this._animationState.lastRequestId) {
      window.cancelAnimationFrame(this._animationState.lastRequestId);
    }
  }

  ///////////////////////
  // Component methods //
  ///////////////////////

  _setContainerRef(instance: HTMLDivElement): void {
    this._refs.container = instance;
  }

  _setInnerRef(instance: HTMLDivElement): void {
    this._refs.inner = instance;
  }

  _updateScrollState(): void {
    const { disableScroll } = this.state;

    const safeRefs = this._getSafeRefs();
    if (safeRefs === null) {
      return;
    }

    const shouldDisableScroll = !this._shouldAnimate();
    if (disableScroll !== shouldDisableScroll) {
      this.setState({ disableScroll: shouldDisableScroll });

      safeRefs.inner.style.transform = translateXCSS(0);
    }
  }

  _resetPosition(): void {
    this._pos.x = this._getInitialPosition();
    if (this._shouldAnimate() && this._refs.inner) {
      this._refs.inner.style.transform = translateXCSS(this._pos.x);
    }
    this._updateScrollState();
  }

  _requestAnimationWithDelay(): void {
    const { delay = 3000 } = this.props;
    setTimeout(this._requestAnimationIfNeeded.bind(this), delay);
  }

  _requestAnimationIfNeeded(): void {
    this._animationState.lastRequestId = window.requestAnimationFrame(this._tick);
  }

  _getMarqueeFillPercent(): number {
    const safeRefs = this._getSafeRefs();
    if (!safeRefs) {
      return 0;
    }

    if (safeRefs.container.clientWidth <= 0) {
      return 0;
    }

    const singleChildSize = (safeRefs.inner.scrollWidth / 2);
    return (singleChildSize * 100) / safeRefs.container.clientWidth;
  }

  _getSafeRefs(): {
    container: HTMLDivElement
    inner: HTMLDivElement
  } | null {
    if (this._refs.container === null || this._refs.inner === null) {
      return null;
    }

    return {
      container: this._refs.container,
      inner: this._refs.inner,
    };
  }

  _shouldAnimate(): boolean {
    const { scrollWhen } = this.props;
    const safeRefs = this._getSafeRefs();
    if (!safeRefs) {
      return false;
    }

    const scrollWhenToUse = scrollWhen ?? MarqueeScrollWhen.ALWAYS;
    return safeRefs.inner.scrollWidth > safeRefs.container.clientWidth
      && this._getMarqueeFillPercent() > scrollWhenToUse;
  }

  _tick(time: number): void {
    const { lastTickTime } = this._animationState;

    if (lastTickTime) {
      this._updateInnerPosition(time - lastTickTime);
    }

    this._animationState.lastTickTime = time;
    this._requestAnimationIfNeeded();
    this._updateScrollState();
  }

  _updateInnerPosition(timeDelta: number): void {
    const { direction = MarqueeScrollDirection.RIGHT, speed = 0.04, childMargin = 15 } = this.props;

    const nextPosX = (() => {
      if (direction === MarqueeScrollDirection.RIGHT) {
        const nextPos = this._pos.x + timeDelta * speed;
        return nextPos > -childMargin ? this._getInitialPosition() : nextPos;
      } if (direction === MarqueeScrollDirection.LEFT) {
        const nextPos = this._pos.x - timeDelta * speed;
        return nextPos < (-(this._getWidthSafely() / 2) - childMargin)
          ? this._getInitialPosition()
          : nextPos;
      }

      return this._pos.x;
    })();

    this._pos.x = nextPosX;

    if (this._shouldAnimate()) {
      const safeRefs = this._getSafeRefs();
      if (safeRefs) {
        safeRefs.inner.style.transform = translateXCSS(this._pos.x);
      }
    }
  }

  _getInitialPosition(): number {
    const { direction = MarqueeScrollDirection.RIGHT, childMargin = 15 } = this.props;

    return direction === MarqueeScrollDirection.RIGHT
      ? -(this._getWidthSafely() / 2) - childMargin
      : -childMargin;
  }

  _getWidthSafely(): number {
    return this._refs && this._refs.inner ? this._refs.inner.clientWidth : 0;
  }

  _getStyleSafely(): CSSStyleDeclaration | null {
    return this._refs && this._refs.inner ? this._refs.inner.style : null;
  }

  ////////////////////
  // Render methods //
  ////////////////////

  render(): React.ReactNode {
    const { childMargin = 15, children = null } = this.props;
    const { disableScroll } = this.state;

    const Child = ({ invisible }: { invisible: boolean }) => (
      <span style={{
        margin: disableScroll ? '0' : `0 ${childMargin}px`,
        visibility: invisible ? 'hidden' : 'visible',
      }}
      >
        {children}
      </span>
    );

    return (
      <div
        ref={this._setContainerRef}
        style={{
          overflowX: 'hidden',
        }}
      >
        <div
          ref={this._setInnerRef}
          style={{
            display: 'inline-block',
          }}
        >
          <Child invisible={false} />
          <Child invisible={disableScroll} />
        </div>
      </div>
    );
  }
}
