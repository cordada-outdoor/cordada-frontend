import React from 'react';
import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

it('renders correctly', () => {
    const el = render(<Carousel><div></div></Carousel>)
    expect(el).toMatchSnapshot();
});