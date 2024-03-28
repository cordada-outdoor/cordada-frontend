import { Avatar, Box, Container } from "@mui/material"
import Layout from "components/Layout/Layout"
import HomeBg from "assets/images/home_bg.jpg"
import "./index.scss"
const Home = () => {
    return <Layout appbarPosition="fixed">
        <Box className="home-page">
            <Box className="home-page-header">
                <img src={HomeBg} alt="home-bg" className="home-background-image" />
            </Box>
        </Box>
    </Layout>
}

export default Home