import { Avatar, Box, CircularProgress } from "@mui/material";
import HomeBg from "assets/images/home_bg.jpg";
import { useQuery } from "@tanstack/react-query";
import { http } from "http/client";
import { getImageUrl } from "utils";

interface ClientInProjectProps {
  id: number;
}
const ClientInProject = ({ id }: ClientInProjectProps) => {
  const clientQuery = useQuery({
    queryKey: ["client", Number(id)],
    queryFn: async () => {
      const res = await http.get(`api/projects/${Number(id)}`, {
        params: {
          populate: "*",
        },
      });

      return res.data;
    },
  });
  const client = clientQuery?.data?.data;
  const img = client?.attributes?.image;
  const imgUrl = getImageUrl(img, "small");
  if (!clientQuery?.data || clientQuery.isLoading) {
    return <CircularProgress className="loading-indicator" />;
  }

  return (
    <Box className="project-client-logos">
      <Avatar
        variant="square"
        className="project-client-logo"
        src={imgUrl ?? HomeBg}
      />
    </Box>
  );
};
export default ClientInProject;
