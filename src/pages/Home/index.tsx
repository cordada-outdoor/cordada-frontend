import "./index.scss";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import AboutImg from "assets/images/about-us.jpg";
import HomeBg from "assets/images/home_bg.jpg";
import LogoWhite from "assets/logos/logo-big-white.png";
import LogoSmallWhite from "assets/logos/logo-small-white.png";
import Carousel from "components/Carousel/Carousel";
import ContactUs from "components/Common/ContactUs";
import PreviewImage from "components/Common/PreviewImage";
import Layout from "components/Layout/Layout";
import { http } from "http/client";
import { Client } from "models/client";
import { Project } from "models/project";
import { getImageUrl } from "utils";
import useUrlLang from "utils/useUrlLang";

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

  const projectsQuery = useQuery({
    queryKey: ["projects", "home"],
    queryFn: async () => {
      const res = await http.get("api/projects", {
        params: {
          "pagination[start]": 0,
          "pagination[limit]": 3,
          populate: "*",
        },
      });

      return res.data;
    },
  });

  const clientsQuery = useQuery({
    queryKey: ["clients", "home"],
    queryFn: async () => {
      const res = await http.get("api/clients", {
        params: {
          populate: "*",
        },
      });

      return res.data;
    },
  });

  const projects = useMemo(() => {
    if (projectsQuery.isLoading) return [];

    return projectsQuery?.data?.data ?? [];
  }, [projectsQuery]);

  const clients = useMemo(() => {
    if (clientsQuery.isLoading) return [];

    return clientsQuery?.data?.data ?? [];
  }, [clientsQuery]);

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
                {projects.map((p: any, i: number) => {
                  const { title, body, client, image } = p.attributes;
                  const imgUrl = getImageUrl(image, "small");

                  return (
                    <Box className="project-preview" key={i}>
                      <PreviewImage
                        src={imgUrl ?? HomeBg}
                        hoverable={true}
                        title={title}
                        description={`${client.data?.attributes?.name?.toUpperCase() ?? ""} X CORDADA`}
                        hoverContent={
                          <Box
                            style={{
                              padding: "1rem",
                            }}
                          >
                            <Typography variant="h4">{title}</Typography>
                            <Typography>{body}</Typography>
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
              {projectsQuery.isLoading ? (
                <CircularProgress className="loading-indicator" />
              ) : (
                projects.map((p: Project, i: number) => {
                  const { title, body, client, image } = p.attributes;
                  const imgUrl = getImageUrl(image, "small");
                  return (
                    <Box className="project-preview" key={i}>
                      <PreviewImage
                        src={imgUrl ?? HomeBg}
                        hoverable={true}
                        title={title}
                        description={`${client.data?.attributes?.name?.toUpperCase() ?? ""} X CORDADA`}
                        hoverContent={
                          <Box className="project-card">
                            <Typography
                              className="project-description"
                              fontWeight={300}
                            >
                              {body}
                            </Typography>
                            <Box className="see-more-button-container">
                              <Link
                                component={Button}
                                to={`${langUrlPrefix}/project/${p.id}`}
                                className="see-more-button"
                              >
                                {t("seeMore")}
                              </Link>
                            </Box>
                          </Box>
                        }
                      />
                    </Box>
                  );
                })
              )}
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
            <Box
              className={
                isMobile ? "mobile-collaborators" : "collaborators-list"
              }
            >
              {clientsQuery.isLoading ? (
                <CircularProgress sx={{ color: "black", margin: "1em" }} />
              ) : (
                clients.map((client: Client, idx: number) => {
                  const { icon } = client.attributes;
                  const imgUrl = getImageUrl(icon, "thumbnail");

                  return (
                    <Avatar
                      variant="square"
                      className="avatar-img"
                      key={client.id}
                      src={imgUrl ?? LogoSmallWhite}
                      alt={"carousel " + idx}
                    />
                  );
                })
              )}
            </Box>
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
