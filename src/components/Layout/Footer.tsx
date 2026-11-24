import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import InstagramLogo from "assets/logos/instagram-logo.svg?react";
import LinkedinLogo from "assets/logos/linkedin-logo.svg?react";
import CustomIconButton from "components/Common/CustomIconButton";
import { cx } from "utils/cx";
import useUrlLang from "utils/useUrlLang";

import styles from "./Footer.module.scss";

const Footer = () => {
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();

  return (
    <Box py={3} px={3} className={styles.footer}>
      <div className={styles.list}>
        <a
          rel="noreferrer"
          href="https://www.instagram.com/cordada.outdoor/"
          target="_blank"
        >
          <CustomIconButton
            description="Instagram"
            className={styles.iconButton}
          >
            <InstagramLogo />
          </CustomIconButton>
        </a>
        <a
          rel="noreferrer"
          href="https://www.linkedin.com/company/cordadatheoutdoorlab/"
          target="_blank"
        >
          <CustomIconButton
            description="Linkedin"
            className={styles.iconButton}
          >
            <LinkedinLogo />
          </CustomIconButton>
        </a>
        <a
          title="Email"
          className={styles.link}
          href="mailto:info@cordadaoutdoor.com"
        >
          <Typography>info@cordadaoutdoor.com</Typography>
        </a>
      </div>
      <div className={cx(styles.list, styles.legal)}>
        <Link to={langUrlPrefix + "/legal-notice"} className={styles.link}>
          <Typography>{t("legalNotice")}</Typography>
        </Link>
        <Link to={langUrlPrefix + "/privacy-policy"} className={styles.link}>
          <Typography>{t("privacyPolicy")}</Typography>
        </Link>
      </div>
    </Box>
  );
};

export default Footer;
