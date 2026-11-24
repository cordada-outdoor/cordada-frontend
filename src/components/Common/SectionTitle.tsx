import { Typography, TypographyProps } from "@mui/material";

// The bold h3 used as the heading of pages and home sections.
const SectionTitle = (props: TypographyProps) => (
  <Typography variant="h3" fontWeight={600} {...props} />
);

export default SectionTitle;
