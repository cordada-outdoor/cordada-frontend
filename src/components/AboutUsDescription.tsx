import { ReactNode, useEffect, useRef, useState } from "react";

import { Avatar, Box, Typography } from "@mui/material";

import { cx } from "utils/cx";

import styles from "./AboutUsDescription.module.scss";

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
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!domRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={domRef}
      className={cx(
        styles.container,
        direction === "right-to-left" && styles.rightToLeft,
        isVisible && styles.visible,
      )}
    >
      <Avatar className={styles.avatar} src={image} />
      <Box>
        <Typography variant="h4">{title}</Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AboutUsDescription;
