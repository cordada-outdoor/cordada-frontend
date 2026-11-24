import { Settings } from "react-slick";

export const HERO_CAROUSEL_SETTINGS: Settings = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  draggable: false,
  fade: true,
  speed: 1000,
  swipeToSlide: false,
  swipe: false,
  pauseOnDotsHover: false,
  pauseOnHover: false,
  pauseOnFocus: false,
  cssEase: "linear",
};

export const MOBILE_PROJECTS_CAROUSEL_SETTINGS: Settings = {
  dots: false,
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  pauseOnDotsHover: false,
  pauseOnHover: true,
  pauseOnFocus: false,
  cssEase: "linear",
};

// Show at most `max` logos, fewer when there aren't enough clients to fill it.
const visibleClients = (count: number, max: number) =>
  count >= max ? max : count;

export const getClientsCarouselSettings = (clientCount: number): Settings => ({
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: visibleClients(clientCount, 6),
  initialSlide: -2,
  autoplay: true,
  pauseOnDotsHover: false,
  pauseOnHover: false,
  pauseOnFocus: false,
  autoplaySpeed: 0,
  speed: 5000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: visibleClients(clientCount, 6) },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: visibleClients(clientCount, 4) },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: visibleClients(clientCount, 3) },
    },
  ],
});
