import { useState } from "react";

import { Box, Grid, Typography } from "@mui/material";

import ArrowBack from "assets/icons/arrow-ios-back.svg?react";
import ArrowForward from "assets/icons/arrow-ios-forward.svg?react";
import { cx } from "utils/cx";

import CustomIconButton from "./CustomIconButton";
import styles from "./DatePicker.module.scss";

const months = [
  { label: "january", value: "01" },
  { label: "february", value: "02" },
  { label: "march", value: "03" },
  { label: "april", value: "04" },
  { label: "may", value: "05" },
  { label: "june", value: "06" },
  { label: "july", value: "07" },
  { label: "august", value: "08" },
  { label: "september", value: "09" },
  { label: "october", value: "10" },
  { label: "november", value: "11" },
  { label: "december", value: "12" },
];

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [year, setYear] = useState(
    value
      ? Number(new Date(value + "-01").getFullYear())
      : Number(new Date().getFullYear()),
  );

  return (
    <Box className={styles.datepicker}>
      <Box className={styles.header}>
        <CustomIconButton onClick={() => setYear(year - 1)}>
          <ArrowBack />
        </CustomIconButton>
        <Typography>{year}</Typography>
        <CustomIconButton onClick={() => setYear(year + 1)}>
          <ArrowForward />
        </CustomIconButton>
      </Box>
      <Grid className={styles.months} container rowGap={1}>
        {months.map((month) => {
          const splitValue = value.split("-");
          const isSelected =
            splitValue[0] === year.toString() && splitValue[1] === month.value;
          return (
            <Grid
              onClick={() => onChange(year.toString() + "-" + month.value)}
              className={cx(styles.month, isSelected && styles.selected)}
              key={month.value}
              item
              md={4}
              xs={12}
            >
              <Typography className={styles.monthText}>
                {month.value}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DatePicker;
