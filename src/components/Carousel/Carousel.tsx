import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ReactNode } from "react";
import Slider, { Settings } from "react-slick";

interface CarouselProps {
  children: ReactNode;
  settings?: Settings;
  className?: string;
}

const Carousel = ({ settings = {}, className, children }: CarouselProps) => {
  return (
    <Slider {...settings} className={className}>
      {children}
    </Slider>
  );
};

export default Carousel;
