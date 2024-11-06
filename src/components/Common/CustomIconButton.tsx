import { ReactNode } from "react";

import { IconButton } from "@mui/material";

interface CustomIconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  description?: string;
}
const CustomIconButton = ({
  description,
  onClick,
  children,
  ...props
}: CustomIconButtonProps) => {
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && onClick) {
      onClick();
    }
  };
  return (
    <IconButton
      {...props}
      title={description}
      className="icon-button"
      onClick={onClick}
      onKeyDown={handleKeyPress}
      aria-description={description}
    >
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
