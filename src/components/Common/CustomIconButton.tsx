import { KeyboardEvent, ReactNode } from "react";

import { IconButton } from "@mui/material";

interface CustomIconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  description?: string;
  className?: string;
}

const CustomIconButton = ({
  description,
  onClick,
  children,
  className,
}: CustomIconButtonProps) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter" && onClick) {
      onClick();
    }
  };
  return (
    <IconButton
      title={description}
      className={className}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      aria-description={description}
    >
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
