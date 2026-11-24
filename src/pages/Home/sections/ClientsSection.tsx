import { Avatar, Box } from "@mui/material";
import { t } from "i18next";

import { useClients } from "api/clients";
import LogoSmallWhite from "assets/logos/logo-small-white.png";
import Carousel from "components/Carousel/Carousel";
import Loading from "components/Common/Loading";
import SectionTitle from "components/Common/SectionTitle";
import { getImageUrl } from "utils";

import { getClientsCarouselSettings } from "../carouselSettings";
import styles from "../Home.module.scss";

const ClientsSection = () => {
  const { data: clients = [], isLoading } = useClients();

  return (
    <Box className={styles.clients}>
      <SectionTitle maxWidth="lg" margin="auto">
        {t("homePage.ourCordada")}
      </SectionTitle>
      <Box>
        {isLoading ? (
          <Loading className={styles.clientsLoading} />
        ) : (
          <Carousel
            settings={getClientsCarouselSettings(clients.length)}
            className={styles.carousel}
          >
            {clients.map((client, idx) => (
              <Avatar
                variant="square"
                className={styles.clientLogo}
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
