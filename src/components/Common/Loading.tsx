import { CircularProgress, CircularProgressProps } from "@mui/material";

// Spinner shown while CMS content loads.
const Loading = ({ className, ...props }: CircularProgressProps) => (
  <CircularProgress
    className={["loading-indicator", className].filter(Boolean).join(" ")}
    {...props}
  />
);

export default Loading;
