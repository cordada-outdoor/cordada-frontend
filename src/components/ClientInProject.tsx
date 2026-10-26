import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { http } from "http/client";
import { getImageUrl } from "utils";

interface ClientInProjectProps {
  documentId: string;
  size?: number;
}

// The project response doesn't populate the client's icon, so fetch it here
const ClientInProject = ({ documentId, size = 40 }: ClientInProjectProps) => {
  const clientQuery = useQuery({
    queryKey: ["client", documentId],
    queryFn: async () => {
      const res = await http.get(`api/clients/${documentId}`, {
        params: {
          populate: "*",
        },
      });

      return res.data;
    },
  });

  const imgUrl = getImageUrl(clientQuery.data?.data?.icon, "small");

  if (!imgUrl) return null;

  return (
    <Avatar
      sx={{ width: size, height: size, bgcolor: "common.black" }}
      src={imgUrl}
      alt=""
    />
  );
};

export default ClientInProject;
