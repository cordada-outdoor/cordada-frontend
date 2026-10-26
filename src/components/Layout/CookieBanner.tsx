import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import useCookieConsent, { setCookieConsent } from "utils/useCookieConsent";
import useUrlLang from "utils/useUrlLang";

const CookieBanner = () => {
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();
  const consent = useCookieConsent();

  if (consent) return null;

  return (
    <Box
      className="cookie-banner"
      role="region"
      aria-label={t("cookies.label")}
    >
      <Typography variant="body2">
        {t("cookies.message")}{" "}
        <Link to={`${langUrlPrefix}/privacy-policy`}>{t("cookies.more")}</Link>
      </Typography>
      <Box className="cookie-banner-actions">
        <Button
          variant="outlined"
          color="white"
          size="small"
          onClick={() => setCookieConsent("declined")}
        >
          {t("cookies.decline")}
        </Button>
        <Button size="small" onClick={() => setCookieConsent("accepted")}>
          {t("cookies.accept")}
        </Button>
      </Box>
    </Box>
  );
};

export default CookieBanner;
