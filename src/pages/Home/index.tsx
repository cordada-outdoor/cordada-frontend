import { Box, Typography } from "@mui/material"
import Layout from "components/Layout/Layout"
import HomeBg from "assets/images/home_bg.jpg"
import LogoWhite from "assets/logos/logo-big-white.png";
import "./index.scss"
import { useEffect, useRef, useState } from "react";
import PreviewImage from "components/Common/PreviewImage";
import { t } from "i18next";

const Home = () => {
    const projectsRef = useRef();
    const [myElementIsVisible, updateMyElementIsVisible] = useState<boolean>(false);
    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            updateMyElementIsVisible(entry.isIntersecting);
        });
        // @ts-expect-error
        observer.observe(projectsRef.current);
    }, []);

    return <Layout appbarPosition="fixed" primaryAppbar={myElementIsVisible}>
        <Box className="home-page">
            <Box className="home-page-header">
                <img src={HomeBg} alt="home-bg" className="home-background-image" />
                <img src={LogoWhite} alt="home-logo" className="home-primary-logo" />
            </Box>
            <Box className="home-projects-section" id="home-projects-section">
                <Typography variant="h3">{t("homePage.ourProjects")}</Typography>
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
                <Typography variant="h3">{t("homePage.ourProjects")}</Typography>
                <Box ref={projectsRef} />

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