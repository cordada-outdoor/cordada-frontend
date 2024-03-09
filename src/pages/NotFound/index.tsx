import { Box, Typography } from "@mui/material"
import Layout from "components/Layout/Layout"
import { useTranslation } from "react-i18next"

const NotFound = () => {
    const { t } = useTranslation();
    return <Layout>
        <Box py={4} px={3} >
            <Typography>{t('pageDoesNotExist')}</Typography>
            <Typography mt={2}>{t('anyDoubtContact')}</Typography>
        </Box>
    </Layout>
}

export default NotFound