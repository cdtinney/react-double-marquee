
import React from 'react';
import {
  mount,
} from 'enzyme';
import Marquee from '../index';

describe('Marquee', () => {
  it('renders standalone without errors', () => {
    mount(<Marquee>foo</Marquee>);
  });

  it('resets position and requests animation on prop updates', (done) => {
    const wrapper = mount(<Marquee>foo</Marquee>);
    wrapper.instance()._resetPosition = jest.fn();
    wrapper.instance()._requestAnimationWithDelay = jest.fn();
    wrapper.setProps({
      children: 'bar',
    }, () => {
      expect(wrapper.instance()._resetPosition).toHaveBeenCalled();
      expect(wrapper.instance()._requestAnimationWithDelay).toHaveBeenCalled();
      done();
    });
  });

  it('does not reset the position when resetOnPropsChange is set to false on prop updates', (done) => {
    const wrapper = mount(<Marquee>foo</Marquee>);
    wrapper.instance()._resetPosition = jest.fn();
    wrapper.setProps({
      resetOnPropsChange: false,
    }, () => {
      expect(wrapper.instance()._resetPosition).not.toHaveBeenCalled();
      done();
    });
  });

  // Behaviour based on clientHeight is not currently possible with JSDom:
  //  https://github.com/airbnb/enzyme/issues/1435
  // This means that the component will never trigger an animation.
  it.skip('requests an animation frame after delay when inside a div requiring wrapping', (done) => {
    window.requestAnimationFrame = jest.fn();
    mount((
      <div
        style={{
          width: '150px',
          whiteSpace: 'nowrap',
        }}
      >
        <Marquee delay={500}>
          foo bar foo bar foo bar foo bar foo bar
        </Marquee>
      </div>
    ));
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(window.requestAnimationFrame).toHaveBeenCalled();
      done();
    }, 1000);
  });

  describe('_tick()', () => {
    it('does not update the inner element position when the tick is the initial tick', () => {
      const instance = mount(<Marquee>foo</Marquee>).instance();
      instance._updateInnerPosition = jest.fn();
      instance._tick(1234);
      expect(instance._updateInnerPosition).not.toHaveBeenCalled();
    });

    it('updates the inner element position when the tick is not the initial tick', () => {
      const instance = mount(<Marquee>foo</Marquee>).instance();
      instance._updateInnerPosition = jest.fn();
      instance._tick(1234);
      instance._tick(1234);
      expect(instance._updateInnerPosition).toHaveBeenCalled();
    });
  });
});
