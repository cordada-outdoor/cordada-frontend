import { Avatar, Box, useMediaQuery } from "@mui/material";
import { t } from "i18next";

import { useClients } from "api/clients";
import LogoSmallWhite from "assets/logos/logo-small-white.png";
import Carousel from "components/Carousel/Carousel";
import Loading from "components/Common/Loading";
import SectionTitle from "components/Common/SectionTitle";
import { theme } from "styles/theme";
import { getImageUrl } from "utils";

import { getClientsCarouselSettings } from "../carouselSettings";

const ClientsSection = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: clients = [], isLoading } = useClients();

  return (
    <Box className="collaborators-preview-container">
      <SectionTitle className="section-title" maxWidth="lg" margin="auto">
        {t("homePage.ourCordada")}
      </SectionTitle>
      <Box className={isMobile ? "mobile-collaborators" : "collaborators-list"}>
        {isLoading ? (
          <Loading sx={{ color: "black" }} />
        ) : (
          <Carousel settings={getClientsCarouselSettings(clients.length)}>
            {clients.map((client, idx) => (
              <Avatar
                variant="square"
                className="avatar-img"
                key={client.id}
                src={getImageUrl(client.icon, "small") ?? LogoSmallWhite}
                alt={"carousel " + idx}
              />
            ))}
          </Carousel>
        )}
      </Box>
    </Box>
  );
};

export default ClientsSection;
