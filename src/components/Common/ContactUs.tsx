import { useTranslation } from "react-i18next";

import { Box, Button, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface ContactUsProps {
  colorScheme: "white-on-black" | "black-on-white";
  titleVariant?: Variant;
}
const ContactUs = ({ colorScheme, titleVariant = "h3" }: ContactUsProps) => {
  const { t } = useTranslation();

  return (
    <Box className={`contact-us-section ${colorScheme}`}>
      <Typography variant={titleVariant}>
        {t("homePage.anyQuestions")}
      </Typography>
      <Box m={2}>
        <a href="mailto:info@cordadaoutdoor.com">
          <Button variant="contained">{t("homePage.writeUs")}</Button>
        </a>
      </Box>
    </Box>
  );
};

export default ContactUs;
