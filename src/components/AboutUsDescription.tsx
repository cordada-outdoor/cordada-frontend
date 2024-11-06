import React, { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

import { Avatar, Box, Typography } from "@mui/material";

interface AboutUsDescriptionProps {
  direction: "left-to-right" | "right-to-left";
  image: string;
  children: ReactNode;
  title: string;
}

const AboutUsDescription = ({
  title,
  direction,
  image,
  children,
}: AboutUsDescriptionProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    // @ts-expect-error
    observer.observe(domRef.current);
  }, []);
  return (
    <Box
      ref={domRef}
      className={`about-us-description-container ${direction} ${isVisible ? "is-visible" : ""}`}
    >
      <Avatar className="about-us-description-avatar" src={image} />
      <Box className="about-us-description">
        <Typography variant="h4">{title}</Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AboutUsDescription;
