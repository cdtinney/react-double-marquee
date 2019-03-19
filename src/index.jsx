import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

function translateXCSS(numPx) {
  return `translateX(${numPx}px)`;
}

export default class Marquee extends PureComponent {
  static propTypes = {
    /**
     * Animation speed, in pixels per milliseconds.
     * Defaults to 0.04.
     */
    speed: PropTypes.number,
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
  };

  static defaultProps = {
    speed: 0.04,
    delay: 3000,
    childMargin: 15,
    children: null,
  };

  // Animation properties.
  _animationState = {
    stopped: true,
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
    this._resetPosition();
    this._requestAnimationWithDelay();
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
    this._refs.inner.style.transform = translateXCSS(this._pos.x);
  }

  _requestAnimationWithDelay() {
    const {
      delay,
    } = this.props;

    setTimeout(
      this._requestAnimationIfNeeded.bind(this),
      delay,
    );
  }

  _requestAnimationIfNeeded() {
    const shouldAnimate = (this._refs.container && this._refs.inner)
      && this._refs.inner.scrollWidth > this._refs.container.clientWidth;
    if (!shouldAnimate) {
      return;
    }

    window.requestAnimationFrame(this._tick);
  }

  _tick(time) {
    const {
      lastTickTime,
    } = this._animationState;

    if (lastTickTime) {
      this._updateInnerPosition(time - lastTickTime);
    }

    this._animationState.lastTickTime = time;
    this._requestAnimationIfNeeded();
  }

  _updateInnerPosition(timeDelta) {
    const {
      childMargin,
      speed,
    } = this.props;

    const nextPos = this._pos.x + (timeDelta * speed);
    this._pos.x = nextPos > -childMargin
      ? this._getInitialPosition()
      : nextPos;
    this._refs.inner.style.transform = translateXCSS(this._pos.x);
  }

  _getInitialPosition() {
    const {
      childMargin,
    } = this.props;

    return -(this._refs.inner.clientWidth / 2) - childMargin;
  }

  ////////////////////
  // Render methods //
  ////////////////////

  render() {
    const {
      childMargin,
      children,
    } = this.props;

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
