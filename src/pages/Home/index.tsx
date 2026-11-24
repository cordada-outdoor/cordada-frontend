import "./index.scss";

import { useEffect, useRef, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";

import Layout from "components/Layout/Layout";
import { theme } from "styles/theme";

import AboutSection from "./sections/AboutSection";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import ServicesSection from "./sections/ServicesSection";

const Home = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [primaryAppbar, setPrimaryAppbar] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Use the primary app bar while the watched section is on screen.
  useEffect(() => {
    const target = isMobile ? servicesRef.current : projectsRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) =>
      setPrimaryAppbar(entry.isIntersecting),
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <Layout appbarPosition="fixed" primaryAppbar={primaryAppbar}>
      <Box className="home-page">
        <HeroSection />
        <ProjectsSection sentinelRef={projectsRef} />
        <ServicesSection sectionRef={servicesRef} />
        <AboutSection />
      </Box>
    </Layout>
  );
};

export default Home;
