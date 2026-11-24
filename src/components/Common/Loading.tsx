import { CircularProgress, CircularProgressProps } from "@mui/material";

import { cx } from "utils/cx";

import styles from "./Loading.module.scss";

// Spinner shown while CMS content loads.
const Loading = ({ className, ...props }: CircularProgressProps) => (
  <CircularProgress className={cx(styles.loading, className)} {...props} />
);

export default Loading;
