// Joins class names, skipping falsy ones: cx(styles.a, isOn && styles.b).
export const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");
