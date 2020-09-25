import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function translateXCSS(numPx) {
  return "translateX(".concat(numPx, "px)");
}

var Marquee = /*#__PURE__*/function (_PureComponent) {
  _inherits(Marquee, _PureComponent);

  var _super = _createSuper(Marquee);

  // Animation properties.
  // Position properties.
  // Wrapper object for element refs.
  function Marquee(props) {
    var _this;

    _classCallCheck(this, Marquee);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_animationState", {
      lastRequestId: null,
      lastTickTime: null
    });

    _defineProperty(_assertThisInitialized(_this), "_pos", {
      x: null
    });

    _defineProperty(_assertThisInitialized(_this), "_refs", {
      container: null,
      inner: null
    });

    _this._setContainerRef = _this._setContainerRef.bind(_assertThisInitialized(_this));
    _this._setInnerRef = _this._setInnerRef.bind(_assertThisInitialized(_this));
    _this._tick = _this._tick.bind(_assertThisInitialized(_this));
    return _this;
  } ///////////////////////
  // Lifecycle methods //
  ///////////////////////


  _createClass(Marquee, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._resetPosition();

      this._requestAnimationWithDelay();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._resetPosition();

      this._requestAnimationWithDelay();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.cancelAnimationFrame(this._animationState.lastRequestId);
    } ///////////////////////
    // Component methods //
    ///////////////////////

  }, {
    key: "_setContainerRef",
    value: function _setContainerRef(ref) {
      this._refs.container = ref;
    }
  }, {
    key: "_setInnerRef",
    value: function _setInnerRef(ref) {
      this._refs.inner = ref;
    }
  }, {
    key: "_resetPosition",
    value: function _resetPosition() {
      this._pos.x = this._getInitialPosition();

      if (this._refs.inner) {
        this._refs.inner.style.transform = translateXCSS(this._pos.x);
      }
    }
  }, {
    key: "_requestAnimationWithDelay",
    value: function _requestAnimationWithDelay() {
      var delay = this.props.delay;
      setTimeout(this._requestAnimationIfNeeded.bind(this), delay);
    }
  }, {
    key: "_requestAnimationIfNeeded",
    value: function _requestAnimationIfNeeded() {
      var shouldAnimate = this._refs.container && this._refs.inner && this._refs.inner.scrollWidth > this._refs.container.clientWidth;

      if (!shouldAnimate) {
        return;
      }

      this._animationState.lastRequestId = window.requestAnimationFrame(this._tick);
    }
  }, {
    key: "_tick",
    value: function _tick(time) {
      var lastTickTime = this._animationState.lastTickTime;

      if (lastTickTime) {
        this._updateInnerPosition(time - lastTickTime);
      }

      this._animationState.lastTickTime = time;

      this._requestAnimationIfNeeded();
    }
  }, {
    key: "_updateInnerPosition",
    value: function _updateInnerPosition(timeDelta) {
      var _this2 = this;

      var _this$props = this.props,
          direction = _this$props.direction,
          speed = _this$props.speed,
          childMargin = _this$props.childMargin;

      var nextPosX = function () {
        if (direction === 'right') {
          var nextPos = _this2._pos.x + timeDelta * speed;
          return nextPos > -childMargin ? _this2._getInitialPosition() : nextPos;
        }

        if (direction === 'left') {
          var _nextPos = _this2._pos.x - timeDelta * speed;

          return _nextPos < -(_this2._getWidthSafely() / 2) - childMargin ? _this2._getInitialPosition() : _nextPos;
        }

        return _this2._pos.x;
      }();

      this._pos.x = nextPosX;

      if (this._refs.inner) {
        this._refs.inner.style.transform = translateXCSS(this._pos.x);
      }
    }
  }, {
    key: "_getInitialPosition",
    value: function _getInitialPosition() {
      var _this$props2 = this.props,
          direction = _this$props2.direction,
          childMargin = _this$props2.childMargin;
      return direction === 'right' ? -(this._getWidthSafely() / 2) - childMargin : -childMargin;
    }
  }, {
    key: "_getWidthSafely",
    value: function _getWidthSafely() {
      return this._refs && this._refs.inner ? this._refs.inner.clientWidth : 0;
    }
  }, {
    key: "_getStyleSafely",
    value: function _getStyleSafely() {
      return this._refs && this._refs.inner ? this._refs.inner.style : null;
    } ////////////////////
    // Render methods //
    ////////////////////

  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          childMargin = _this$props3.childMargin,
          children = _this$props3.children;

      var Child = function Child() {
        return /*#__PURE__*/React.createElement("span", {
          style: {
            margin: "0 ".concat(childMargin, "px")
          }
        }, children);
      };

      return /*#__PURE__*/React.createElement("div", {
        ref: this._setContainerRef,
        style: {
          overflowX: 'hidden'
        }
      }, /*#__PURE__*/React.createElement("div", {
        ref: this._setInnerRef,
        style: {
          display: 'inline-block'
        }
      }, /*#__PURE__*/React.createElement(Child, null), /*#__PURE__*/React.createElement(Child, null)));
    }
  }]);

  return Marquee;
}(PureComponent);

_defineProperty(Marquee, "propTypes", {
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
  children: PropTypes.node
});

_defineProperty(Marquee, "defaultProps", {
  speed: 0.04,
  delay: 3000,
  direction: 'right',
  childMargin: 15,
  children: null
});

export default Marquee;
