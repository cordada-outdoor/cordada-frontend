import React, { ReactNode } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
    settings: Settings,
    children: ReactNode
}

const Carousel = ({ settings, children }: CarouselProps) => {
    return (
        <Slider {...settings} className="carousel">
            {children}
        </Slider>
    );
}

export default Carousel