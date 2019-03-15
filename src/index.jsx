import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export function translateXCSS(numPx) {
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
     * Delay until animation starts, in seconds.
     * Defaults to 2 seconds.
     */
    delay: PropTypes.number,
    /**
     * Margin between children, in pixels.
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
    delay: 2,
    childMargin: 10,
    children: null,
  };

  // Wrapper object for element refs.
  _refs = {};

  constructor(props) {
    super(props);
    this._setContainerRef = this._setContainerRef.bind(this);
    this._setInnerRef = this._setInnerRef.bind(this);
    this._tick = this._tick.bind(this);
    this._animationState = {
      started: false,
    };
    this._timeState = {
      last: null,
    };
    this._pos = {
      x: null,
    };
  }

  ///////////////////////
  // Lifecycle methods //
  ///////////////////////

  componentDidMount() {
    const {
      delay,
    } = this.props;

    setTimeout(() => {
      this._animationState.started = true;
      // We need to offset the initial position to the left by
      // the width of a single child.
      this._pos.x = -this._childWidth();
      // Start animating!
      this._requestAnimation();
    }, delay * 1000);
  }

  componentWillUnmount() {
    this._animationState.started = false;
  }

  //////////////////////
  // Component method //
  //////////////////////

  _setContainerRef(ref) {
    this._refs.container = ref;
  }

  _setInnerRef(ref) {
    this._refs.inner = ref;
  }

  _requestAnimation() {
    window.requestAnimationFrame(this._tick);
  }

  _tick(time) {
    if (!this._animationState.started) {
      return;
    }

    if (this._timeState.last !== null) {
      this._updatePosition(time - this._timeState.last);
    }

    this._timeState.last = time;
    this._requestAnimation();
  }

  _updatePosition(timeDiff) {
    const {
      speed,
    } = this.props;

    // Do a step forward.
    this._pos.x += timeDiff * speed;

    const requiresWrap = this._pos.x > this._refs.container.clientWidth;
    if (requiresWrap) {
      this._pos.x = -this._childWidth();
    }

    this._refs.inner.style.transform = translateXCSS(this._pos.x);
  }

  _childWidth() {
    return this._refs.inner.clientWidth / 2;
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
