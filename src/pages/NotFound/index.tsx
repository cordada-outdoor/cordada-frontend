import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";

import Layout from "components/Layout/Layout";
import PageContainer from "components/Layout/PageContainer";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <PageContainer readable>
        <Typography>{t("pageDoesNotExist")}</Typography>
        <Typography mt={2}>{t("anyDoubtContact")}</Typography>
      </PageContainer>
    </Layout>
  );
};

export default NotFound;
