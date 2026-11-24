import { Avatar, Box } from "@mui/material";

import { useClient } from "api/clients";
import HomeBg from "assets/images/home_bg.jpg";
import Loading from "components/Common/Loading";
import { getImageUrl } from "utils";

import styles from "./ClientInProject.module.scss";

interface ClientInProjectProps {
  documentId: string;
}

const ClientInProject = ({ documentId }: ClientInProjectProps) => {
  const { data: client, isLoading } = useClient(documentId);

  if (isLoading) {
    return <Loading />;
  }

  const imgUrl = getImageUrl(client?.icon, "small");

  return (
    <Box display="flex" alignItems="center" justifyContent="center" p={2}>
      <Avatar className={styles.avatar} src={imgUrl ?? HomeBg} />
    </Box>
  );
};
export default ClientInProject;
