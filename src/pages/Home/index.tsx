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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import HomeBg from "assets/images/home_bg.jpg";
import LogoSmallWhite from "assets/logos/logo-small-white.png";
import Carousel from "components/Carousel/Carousel";
import ContactUs from "components/Common/ContactUs";
import PreviewImage from "components/Common/PreviewImage";
import RenderMarkdown from "components/Common/RenderMarkdown";
import { StrapiImage } from "components/Common/StrapiImage";
import Layout from "components/Layout/Layout";
import { http } from "http/client";
import { Client } from "models/client";
import { Project } from "models/project";
import { getHomeImagesArr, getImageUrl } from "utils";
import { theme } from "utils/theme";
import useUrlLang from "utils/useUrlLang";

const Home = () => {
  const projectsRef = useRef();
  const servicesRef = useRef();
  const [projectsSectionVisible, updateProjectsSectionVisible] =
    useState<boolean>(false);

  const { langUrlPrefix } = useUrlLang();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
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
          pagination: {
            start: 0,
            limit: 3,
          },
          populate: "*",
          sort: "createdAt:desc",
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
          sort: "homepageOrder:asc",
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

  const homepageQuery = useQuery({
    queryKey: ["homepage"],
    queryFn: async () => {
      const res = await http.get("api/homepage", {
        params: {
          populate: "*",
        },
      });

      return res.data;
    },
  });

  const homeImagesArr = getHomeImagesArr(homepageQuery.data?.data.heroImages);

  return (
    <Layout appbarPosition="fixed" primaryAppbar={projectsSectionVisible}>
      <Box className="home-page">
        <Box className="home-page-header">
          <Carousel
            settings={{
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
            }}
          >
            {homeImagesArr.map((homeImage, idx) => {
              return (
                <Box key={idx}>
                  <Box className="home-background-image-container">
                    <img
                      key={idx}
                      src={homeImage.hero}
                      alt="home-bg"
                      className="home-background-image"
                    />
                  </Box>
                  <Box className="home-primary-logo-container">
                    <img
                      src={homeImage.logo}
                      alt="home-logo"
                      className="home-primary-logo"
                    />
                  </Box>
                </Box>
              );
            })}
          </Carousel>
          <Box
            className="home-corp-copy"
            display="flex"
            justifyContent="center"
          >
            <Box maxWidth="lg">
              <RenderMarkdown markdown={homepageQuery.data?.data.heroCopy} />
            </Box>
          </Box>
        </Box>

        <Box className="home-projects-section" id="home-projects-section">
          <Typography
            variant="h3"
            fontWeight={600}
            className="section-title"
            maxWidth="lg"
            margin="auto"
          >
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
                  cssEase: "linear",
                }}
              >
                {projects.map((p: any, i: number) => {
                  const { title, subtitle, client, image } = p;
                  const imgUrl = getImageUrl(image, "large");

                  return (
                    <Box className="project-preview" key={i}>
                      <PreviewImage
                        src={imgUrl ?? HomeBg}
                        hoverable={true}
                        title={title}
                        description={`${client?.name?.toUpperCase() ?? ""} X CORDADA`}
                        hoverContent={
                          <Box
                            style={{
                              padding: "1rem",
                            }}
                          >
                            <Typography variant="h5" fontWeight={600}>
                              {title}
                            </Typography>
                            <Typography className="project-description">
                              {subtitle}
                            </Typography>
                            <Box className="see-more-button-container">
                              <Link
                                to={`${langUrlPrefix}/project/${p.documentId}`}
                              >
                                <Button className="see-more-button">
                                  {t("seeMore")}
                                </Button>
                              </Link>
                            </Box>
                          </Box>
                        }
                      />
                    </Box>
                  );
                })}
              </Carousel>
            </Box>
          ) : (
            <Box
              className="projects-preview-container"
              maxWidth="lg"
              margin="auto"
            >
              {projectsQuery.isLoading ? (
                <CircularProgress className="loading-indicator" />
              ) : (
                projects.map((p: Project, i: number) => {
                  const { title, subtitle, client, image } = p;
                  const imgUrl = getImageUrl(image, "large");
                  return (
                    <Box className="project-preview" key={i}>
                      <PreviewImage
                        src={imgUrl ?? HomeBg}
                        hoverable={true}
                        title={title}
                        description={`${client?.name?.toUpperCase() ?? ""} X CORDADA`}
                        hoverContent={
                          <Box className="project-card">
                            <Typography variant="h5" fontWeight={600}>
                              {title}
                            </Typography>
                            <Typography className="project-description">
                              {subtitle}
                            </Typography>
                            <Box className="see-more-button-container">
                              <Link
                                to={`${langUrlPrefix}/project/${p.documentId}`}
                              >
                                <Button className="see-more-button">
                                  {t("seeMore")}
                                </Button>
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

          <Box margin="auto" display="flex" maxWidth="lg" justifyContent="end">
            <Link
              className="see-projects-button-container"
              to={`${langUrlPrefix}/projects`}
            >
              <Button
                className="see-projects-button"
                color="primary"
                variant="contained"
              >
                {t("homePage.allProjects")}
              </Button>
            </Link>
          </Box>

          <Box ref={projectsRef} />

          <Box className="collaborators-preview-container">
            <Typography
              variant="h3"
              fontWeight={600}
              className="section-title"
              maxWidth="lg"
              margin="auto"
            >
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
                <Carousel
                  settings={{
                    dots: false,
                    arrows: false,
                    infinite: true,
                    slidesToShow: clients?.length > 5 ? 6 : clients.length,
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
                        settings: {
                          slidesToShow:
                            clients?.length > 5 ? 6 : clients.length,
                        },
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow:
                            clients?.length > 3 ? 4 : clients.length,
                        },
                      },
                      {
                        breakpoint: 480,
                        settings: {
                          slidesToShow:
                            clients?.length > 2 ? 3 : clients.length,
                        },
                      },
                    ],
                  }}
                >
                  {clients.map((client: Client, idx: number) => {
                    const { icon } = client;
                    const imgUrl = getImageUrl(icon, "small");
                    return (
                      <Avatar
                        variant="square"
                        className="avatar-img"
                        key={client.id}
                        src={imgUrl ?? LogoSmallWhite}
                        alt={"carousel " + idx}
                      />
                    );
                  })}
                </Carousel>
              )}
            </Box>
          </Box>
        </Box>

        <Box
          ref={servicesRef}
          className="home-services-section"
          display="flex"
          justifyContent="center"
        >
          <Box maxWidth="lg">
            <Typography variant="h3" fontWeight={600}>
              {t("ourServices")}
            </Typography>
            <RenderMarkdown markdown={homepageQuery.data?.data.servicesCopy} />
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
        </Box>
        <Box className="home-about-section">
          <Box className="about-us-img-container">
            <StrapiImage
              image={homepageQuery.data?.data.contactUsImage}
              className="about-us-img"
            />
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
