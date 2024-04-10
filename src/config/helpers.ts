export const string = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    return 'true'
    throw new Error(`Missing environment variable ${key}`);
  }

  return value;
};

export const oneOf = <T extends string>(key: string, values: T[]): T => {
  const value = string(key) as T;

  if (!values.includes(value)) {
    throw new Error(
      `Invalid value for environment variable ${key}=${value}. Allowed values are: ${values.join(", ")}`,
    );
  }

  return value;
};

export const boolean = (key: string): boolean => {
  const value = oneOf(key, ["true", "false"]);

  return value === "true";
};
