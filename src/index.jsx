import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

function translateXCSS(numPx) {
  return `translateX(${numPx}px)`;
}

export default class Marquee extends PureComponent {
  // Animation properties.
  _animationState = {
    lastRequestId: null,
    lastTickTime: null,
  };

  // Position properties.
  _pos = {
    x: null,
  };

  // Wrapper object for element refs.
  _refs = {
    container: null,
    inner: null,
  };

  static propTypes = {
    /**
     * Animation speed, in pixels per milliseconds.
     * Defaults to 0.04.
     */
    speed: PropTypes.number,
    /**
     * Direction of movement; either 'left' or 'right'.
     * Defaults to 'right'.
     */
    direction: PropTypes.oneOf(['left', 'right']),
    /**
     * Delay until animation starts, in milliseconds.
     * Defaults to three seconds.
     */
    delay: PropTypes.number,
    /**
     * Horizontal margin between children, in pixels.
     * Defaults to 10px.
     */
    childMargin: PropTypes.number,
    /**
     * Children to render.
     * Default is `null`.
     */
    children: PropTypes.node,
    /**
     * Reset position when props change
     * Default is true
     */
    resetOnPropsChange: PropTypes.bool,
  };

  static defaultProps = {
    speed: 0.04,
    delay: 3000,
    direction: 'right',
    childMargin: 15,
    resetOnPropsChange: true,
    children: null,
  };

  constructor(props) {
    super(props);

    this._setContainerRef = this._setContainerRef.bind(this);
    this._setInnerRef = this._setInnerRef.bind(this);
    this._tick = this._tick.bind(this);
  }

  ///////////////////////
  // Lifecycle methods //
  ///////////////////////

  componentDidMount() {
    this._resetPosition();
    this._requestAnimationWithDelay();
  }

  componentDidUpdate() {
    const { resetOnPropsChange } = this.props;
    if (resetOnPropsChange) {
      this._resetPosition();
    }
    this._requestAnimationWithDelay();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this._animationState.lastRequestId);
  }

  ///////////////////////
  // Component methods //
  ///////////////////////

  _setContainerRef(ref) {
    this._refs.container = ref;
  }

  _setInnerRef(ref) {
    this._refs.inner = ref;
  }

  _resetPosition() {
    this._pos.x = this._getInitialPosition();

    if (this._refs.inner) {
      this._refs.inner.style.transform = translateXCSS(this._pos.x);
    }
  }

  _requestAnimationWithDelay() {
    const { delay } = this.props;

    setTimeout(this._requestAnimationIfNeeded.bind(this), delay);
  }

  _requestAnimationIfNeeded() {
    const shouldAnimate = this._refs.container
      && this._refs.inner
      && this._refs.inner.scrollWidth > this._refs.container.clientWidth;
    if (!shouldAnimate) {
      return;
    }

    this._animationState.lastRequestId = window.requestAnimationFrame(this._tick);
  }

  _tick(time) {
    const { lastTickTime } = this._animationState;

    if (lastTickTime) {
      this._updateInnerPosition(time - lastTickTime);
    }

    this._animationState.lastTickTime = time;
    this._requestAnimationIfNeeded();
  }

  _updateInnerPosition(timeDelta) {
    const { direction, speed, childMargin } = this.props;

    const nextPosX = (() => {
      if (direction === 'right') {
        const nextPos = this._pos.x + timeDelta * speed;
        return nextPos > -childMargin ? this._getInitialPosition() : nextPos;
      } if (direction === 'left') {
        const nextPos = this._pos.x - timeDelta * speed;
        return nextPos < (-(this._getWidthSafely() / 2) - childMargin)
          ? this._getInitialPosition()
          : nextPos;
      }

      return this._pos.x;
    })();

    this._pos.x = nextPosX;

    if (this._refs.inner) {
      this._refs.inner.style.transform = translateXCSS(this._pos.x);
    }
  }

  _getInitialPosition() {
    const { direction, childMargin } = this.props;

    return direction === 'right'
      ? -(this._getWidthSafely() / 2) - childMargin
      : -childMargin;
  }

  _getWidthSafely() {
    return this._refs && this._refs.inner ? this._refs.inner.clientWidth : 0;
  }

  _getStyleSafely() {
    return this._refs && this._refs.inner ? this._refs.inner.style : null;
  }

  ////////////////////
  // Render methods //
  ////////////////////

  render() {
    const { childMargin, children } = this.props;

    const Child = () => (
      <span
        style={{
          margin: `0 ${childMargin}px`,
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
          <Child />
          <Child />
        </div>
      </div>
    );
  }
}
