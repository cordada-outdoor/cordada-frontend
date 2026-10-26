import { ReactNode } from "react";

import { Avatar, Box, Typography } from "@mui/material";

import useRevealOnScroll from "utils/useRevealOnScroll";

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
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();
  return (
    <Box
      ref={ref}
      className={`about-us-description-container ${direction} ${isVisible ? "is-visible" : ""}`}
    >
      <Avatar className="about-us-description-avatar" src={image} />
      <Box className="about-us-description">
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AboutUsDescription;
