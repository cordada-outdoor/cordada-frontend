import Layout from 'components/Layout/Layout';
import './index.scss'
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HomeBg from "assets/images/home_bg.jpg"
import PreviewImage from 'components/Common/PreviewImage';

const Projects = () => {
    const { t } = useTranslation();

    return <Layout>
        <Box className="projects">
            <Typography variant="h3">{t("homePage.ourProjects")}</Typography>
            <Box className="filter-section">
                <Typography className="filter-title">{t("projectsPage.filterBy")}</Typography>
                <Button className='filter-button'>{t("projectsPage.type")}</Button>
                <Button className='filter-button'>{t("projectsPage.date")}</Button>
                <Button className='filter-button'>{t("projectsPage.client")}</Button>
            </Box>
            <Box className="projects-section">
                <Grid container spacing={2}>
                    {['', '', '', '', '', ''].map((aP, idx) => {
                        return <Grid item key={idx} md={4} xs={12} sm={6}>
                            <Box className="project-container">
                                <PreviewImage
                                    src={HomeBg}
                                    hoverable={true}
                                    title='Project title'
                                    description='Project description'
                                    hoverContent={<Box className="project-card">
                                        <Typography variant="h6">Project title</Typography>
                                        <Typography variant="subtitle1">Project subtitle</Typography>
                                        <Typography className='project-description' fontWeight={300}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Typography>
                                        <Box className="see-more-button-container">
                                            <Button className="see-more-button">{t("seeMore")}</Button>
                                        </Box>

                                    </Box>}
                                />
                            </Box>
                        </Grid>
                    })}
                </Grid>
            </Box>
        </Box>
    </Layout>
}

export default Projects;