import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Layout from "components/Layout/Layout";
import HomeBg from "assets/images/home_bg.jpg";
import AboutImg from "assets/images/about-us.jpg";
import LogoWhite from "assets/logos/logo-big-white.png";
import "./index.scss";
import { useEffect, useRef, useState } from "react";
import PreviewImage from "components/Common/PreviewImage";
import { t } from "i18next";
import Carousel from "components/Carousel/Carousel";
import { Link } from "react-router-dom";
import useUrlLang from "utils/useUrlLang";
import ContactUs from "components/Common/ContactUs";
import { useQuery } from "@tanstack/react-query";
import { http } from "http/client";

const Home = () => {
  const projectsRef = useRef();
  const servicesRef = useRef();
  const [projectsSectionVisible, updateProjectsSectionVisible] =
    useState<boolean>(false);

  const { langUrlPrefix } = useUrlLang();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];
      updateProjectsSectionVisible(entry.isIntersecting);
    });
    // @ts-expect-error
    observer.observe(!isMobile ? projectsRef.current : servicesRef.current);
  }, [isMobile]);

  const projects = useQuery({
    queryKey: ["projects", "home"],
    queryFn: async (...args) => {
      const res = await http.get("api/projects", {
        params: {
          "pagination[start]": 0,
          "pagination[limit]": 3,
          populate: "client",
        },
      });

      return res.data;
    },
  });

  return (
    <Layout appbarPosition="fixed" primaryAppbar={projectsSectionVisible}>
      <Box className="home-page">
        <Box className="home-page-header">
          <img src={HomeBg} alt="home-bg" className="home-background-image" />
          <img src={LogoWhite} alt="home-logo" className="home-primary-logo" />
        </Box>
        <Box className="home-projects-section" id="home-projects-section">
          <Typography variant="h3" className="section-title">
            {t("homePage.ourProjects")}
          </Typography>
          {isMobile ? (
            <Box className="mobile-projects-preview">
              <Carousel
                settings={{
                  dots: false,
                  arrows: true,
                  infinite: true,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: false,
                  pauseOnDotsHover: false,
                  pauseOnHover: true,
                  pauseOnFocus: false,
                  speed: 500,
                  cssEase: "linear",
                }}
              >
                {projects.data?.data.map((p: any, i: number) => {
                  return (
                    <Box className="project-preview" key={i}>
                      <PreviewImage
                        src={HomeBg}
                        hoverable={true}
                        title={p.attributes.title}
                        description={`${p.attributes.client.data.attributes.name.toUpperCase()} X CORDADA`}
                        hoverContent={
                          <Box
                            style={{
                              padding: "1rem",
                            }}
                          >
                            <Typography variant="h4">
                              {p.attributes.title}
                            </Typography>
                            <Typography>{p.attributes.body}</Typography>
                          </Box>
                        }
                      />
                    </Box>
                  );
                })}
              </Carousel>
            </Box>
          ) : (
            <Box className="projects-preview-container">
              {projects.data?.data.map((p: any, i: number) => {
                return (
                  <Box className="project-preview" key={i}>
                    <PreviewImage
                      src={HomeBg}
                      hoverable={true}
                      title={p.attributes.title}
                      description={`${p.attributes.client.data.attributes.name.toUpperCase()} X CORDADA`}
                      hoverContent={
                        <Box
                          style={{
                            padding: "1rem",
                          }}
                        >
                          <Typography variant="h4">
                            {p.attributes.title}
                          </Typography>
                          <Typography>{p.attributes.body}</Typography>
                        </Box>
                      }
                    />
                  </Box>
                );
              })}
            </Box>
          )}

          <Link
            className="see-projects-button-container"
            to={`${langUrlPrefix + "/projects"}`}
          >
            <Button
              className="see-projects-button"
              color="primary"
              variant="contained"
            >
              {t("homePage.allProjects")}
            </Button>
          </Link>
          <Box ref={projectsRef} />

          <Box className="collaborators-preview-container">
            <Typography variant="h3" className="section-title">
              {t("homePage.ourCordada")}
            </Typography>
            {isMobile ? (
              <Box className="mobile-collaborators">
                {["", "", "", "", "", "", "", ""].map((aI, idx) => {
                  return <img src={HomeBg} alt={"carousel " + idx} />;
                })}
              </Box>
            ) : (
              <Carousel
                settings={{
                  dots: false,
                  arrows: false,
                  infinite: true,
                  slidesToShow: 6,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 7000,
                  pauseOnDotsHover: false,
                  pauseOnHover: true,
                  pauseOnFocus: false,
                  speed: 2000,
                  cssEase: "linear",
                }}
              >
                {["", "", "", "", "", "", "", ""].map((aI, idx) => {
                  return <img src={HomeBg} alt={"carousel " + idx} />;
                })}
              </Carousel>
            )}
          </Box>
        </Box>

        <Box ref={servicesRef} className="home-services-section">
          <Typography variant="h3">{t("ourServices")}</Typography>
          <Box py={2} />
          <Typography>{t("homePage.servicesText1")}</Typography>
          <Box py={2} />
          <Typography variant="h5">{t("homePage.expertsIn")}</Typography>
          <Box mt={1} />
          <Typography variant="h4">
            {t("homePage.expertsDescription")}
          </Typography>
          <Link
            className="see-services-button-container"
            to={`${langUrlPrefix + "/services"}`}
          >
            <Button
              className="see-services-button"
              color="primary"
              variant="contained"
            >
              {t("homePage.allServices")}
            </Button>
          </Link>
        </Box>
        <Box className="home-about-section">
          <Box className="about-us-img-container">
            <img src={AboutImg} alt="about-us" className="about-us-img" />
            <Link
              className="about-us-button-container"
              to={`${langUrlPrefix + "/about"}`}
            >
              <Button
                className="about-us-button"
                color="primary"
                variant="contained"
              >
                {t("aboutUs")}
              </Button>
            </Link>
          </Box>

          <ContactUs titleVariant="h3" colorScheme="white-on-black" />
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
