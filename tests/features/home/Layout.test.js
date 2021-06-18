import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Layout />);
  expect(renderedComponent.find('.home-layout').length).toBe(1);
});
