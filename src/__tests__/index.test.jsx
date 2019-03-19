import React from 'react';
import { mount } from 'enzyme';
import Marquee from '../index';

describe('Marquee', () => {
  it('renders without errors', () => {
    mount(<Marquee>foo</Marquee>);
  });
});
