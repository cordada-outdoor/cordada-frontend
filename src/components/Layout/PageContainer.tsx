import { ReactNode } from "react";

import { Box, Container } from "@mui/material";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  // Caps line length for long-form text
  readable?: boolean;
}

// Shared width and gutters for every page except the full-bleed home page
const PageContainer = ({
  children,
  className,
  readable = false,
}: PageContainerProps) => {
  return (
    <Container
      maxWidth="lg"
      className={className}
      sx={{
        px: { xs: 2.5, md: 4.5 },
        // On mobile the app bar is fixed and overlays the page
        pt: { xs: 10, md: 6 },
        pb: 8,
      }}
    >
      {readable ? <Box maxWidth="75ch">{children}</Box> : children}
    </Container>
  );
};

export default PageContainer;
