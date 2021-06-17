import React from 'react';
import { shallow } from 'enzyme';
import { CardDetail } from '../../../src/features/home/CardDetail';

describe('home/CardDetail', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CardDetail {...props} />
    );

    expect(
      renderedComponent.find('.home-card-detail').length
    ).toBe(1);
  });
});
