import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { ReactComponent as InstagramLogo } from 'assets/logos/instagram-logo.svg'
import { ReactComponent as LinkedinLogo } from 'assets/logos/linkedin-logo.svg'
import CustomIconButton from "components/Common/CustomIconButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation()
    return <Box py={3} px={3} className="footer">
        <div className="horizontal-list">
            <a rel="noreferrer" href="https://www.instagram.com/cordada.outdoor/" target="_blank">
                <CustomIconButton description="Instagram">
                    <InstagramLogo />
                </CustomIconButton>
            </a>
            <a rel="noreferrer" href="https://www.linkedin.com/company/cordadatheoutdoorlab/" target="_blank">
                <CustomIconButton description="Linkedin">
                    <LinkedinLogo />
                </CustomIconButton>
            </a>
            <a title="Email" className="footer-link" href="mailto:info@cordadaoutdoor.com">
                <Typography>info@cordadaoutdoor.com</Typography>
            </a>
        </div>
        {!isMobile && (
            <div className="horizontal-list">
                <Link to="/" className="footer-link">
                    <Typography>{t('legalNotice')}</Typography>
                </Link>
                <Link to="/" className="footer-link">
                    <Typography>{t('privacyPolicy')}</Typography>
                </Link>
            </div>
        )}

    </Box>
};

export default Footer;