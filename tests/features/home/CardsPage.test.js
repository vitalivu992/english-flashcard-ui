import React from 'react';
import { shallow } from 'enzyme';
import { CardsPage } from '../../../src/features/home/CardDetail';

describe('home/CardsPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CardsPage {...props} />
    );

    expect(
      renderedComponent.find('.home-card-detail').length
    ).toBe(1);
  });
});
