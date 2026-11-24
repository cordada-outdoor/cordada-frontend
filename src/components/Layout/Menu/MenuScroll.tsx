import React, { ReactElement } from "react";

import { useScrollTrigger } from "@mui/material";

import { AppbarPosition } from "models";

interface MenuScrollProps {
  children: ReactElement;
  position?: AppbarPosition;
}

// Makes a fixed app bar transparent until the page is scrolled.
const MenuScroll = ({ children, position }: MenuScrollProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    color: trigger || position !== "fixed" ? "primary" : "transparent",
    elevation: trigger ? 4 : 0,
  });
};

export default MenuScroll;
