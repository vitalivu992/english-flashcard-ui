import React from 'react';
import { shallow } from 'enzyme';
import { Flashcard } from '../../../src/features/home/Flashcard';

describe('home/Flashcard', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Flashcard {...props} />
    );

    expect(
      renderedComponent.find('.home-flashcard').length
    ).toBe(1);
  });
});
