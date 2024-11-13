import React from "react";

import { Avatar, Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import HomeBg from "assets/images/home_bg.jpg";
import { http } from "http/client";
import { getImageUrl } from "utils";

interface ClientInProjectProps {
  id: number;
}

const ClientInProject = ({ id }: ClientInProjectProps) => {
  const clientQuery = useQuery({
    queryKey: ["client", Number(id)],
    queryFn: async () => {
      const res = await http.get(`api/clients/${Number(id)}`, {
        params: {
          populate: "*",
        },
      });

      return res.data;
    },
  });

  if (!clientQuery.data || clientQuery.isLoading) {
    return <CircularProgress className="loading-indicator" />;
  }

  const client = clientQuery.data.data;
  const img = client.attributes.icon;
  const imgUrl = getImageUrl(img, "small");

  return (
    <Box className="project-client-logos">
      <Avatar className="project-client-logo" src={imgUrl ?? HomeBg} />
    </Box>
  );
};
export default ClientInProject;
