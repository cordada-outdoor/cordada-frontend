import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { ReactNode } from "react";
import Slider, { Settings } from "react-slick";

interface CarouselProps {
  children: ReactNode;
  settings?: Settings;
}

const Carousel = ({ settings = {}, children }: CarouselProps) => {
  return (
    <Slider {...settings} className="carousel">
      {children}
    </Slider>
  );
};

export default Carousel;
