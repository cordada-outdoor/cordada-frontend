import { useTranslation } from "react-i18next";

import { Box, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface ContactUsProps {
  colorScheme: "white-on-black" | "black-on-white";
  titleVariant?: Variant;
}
const ContactUs = ({ colorScheme, titleVariant = "h3" }: ContactUsProps) => {
  const { t } = useTranslation();
  return (
    <Box className={`contact-us-section ${colorScheme}`}>
      <Typography variant={titleVariant}>{t("homePage.contactUs")}</Typography>
      <a
        title="Email"
        className="contact-us-button"
        href="mailto:info@cordadaoutdoor.com"
      />
    </Box>
  );
};

export default ContactUs;
