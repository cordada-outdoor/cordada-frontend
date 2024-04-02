import { Box, Button, Typography } from "@mui/material"
import Layout from "components/Layout/Layout"
import HomeBg from "assets/images/home_bg.jpg"
import LogoWhite from "assets/logos/logo-big-white.png";
import "./index.scss"
import { useEffect, useRef, useState } from "react";
import PreviewImage from "components/Common/PreviewImage";
import { t } from "i18next";
import Carousel from "components/Carousel/Carousel";
import { Link } from "react-router-dom";
import useUrlLang from "utils/useUrlLang";

const Home = () => {
    const projectsRef = useRef();
    const [projectsSectionVisible, updateProjectsSectionVisible] = useState<boolean>(false);
    const { langUrlPrefix } = useUrlLang();

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            updateProjectsSectionVisible(entry.isIntersecting);
        });
        // @ts-expect-error
        observer.observe(projectsRef.current);
    }, []);


    return <Layout appbarPosition="fixed" primaryAppbar={projectsSectionVisible}>
        <Box className="home-page">
            <Box className="home-page-header">
                <img src={HomeBg} alt="home-bg" className="home-background-image" />
                <img src={LogoWhite} alt="home-logo" className="home-primary-logo" />
            </Box>
            <Box className="home-projects-section" id="home-projects-section">
                <Typography variant="h3" className="section-title">{t("homePage.ourProjects")}</Typography>
                <Box className="projects-preview-container">
                    {['', '', ''].map((aI, idx) => {
                        return <Box className="project-preview">
                            <PreviewImage
                                src={HomeBg}
                                hoverable={true}
                                hoverContent={(
                                    <Box>
                                        <Typography variant="h3">Title</Typography>
                                        <Typography>Some really long description</Typography>
                                    </Box>
                                )}
                            />
                        </Box>
                    })}

                </Box>
                <Link className="see-projects-button-container" to={`${langUrlPrefix + '/projects'}`}>
                    <Button className="see-projects-button" color="primary" variant="contained">{t("homePage.allProjects")}</Button>
                </Link>
                <Box ref={projectsRef} />

                <Box className="collaborators-preview-container">
                    <Typography variant="h3" className="section-title">{t("homePage.ourCordada")}</Typography>

                    <Carousel settings={{
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
                        cssEase: 'linear'
                    }}>
                        {['', '', '', '', '', '', '', ''].map((aI, idx) => {
                            return <img src={HomeBg} alt={'carousel ' + idx} />
                        })}
                    </Carousel>
                </Box>
            </Box>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </Box>
    </Layout>
}

export default Home