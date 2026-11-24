import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import useUrlLang from "utils/useUrlLang";

import { NavItem } from "./navigation";

interface NavLinksProps {
  items: NavItem[];
  className?: string;
  itemClassName?: string;
  buttonClassName?: string;
  activeClassName?: string;
  uppercase?: boolean;
}

const NavLinks = ({
  items,
  className,
  itemClassName,
  buttonClassName,
  activeClassName,
  uppercase = false,
}: NavLinksProps) => {
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();

  return (
    <List className={className}>
      {items.map(({ label, path }) => {
        const text = t(label);
        return (
          <ListItem key={path} className={itemClassName}>
            <ListItemButton
              component={NavLink}
              to={`${langUrlPrefix}${path}`}
              className={buttonClassName}
              // Home is never shown as selected.
              activeClassName={path === "/" ? undefined : activeClassName}
              isActive={path === "/" ? () => false : undefined}
            >
              <ListItemText
                primary={
                  <Typography fontWeight={700}>
                    {uppercase ? text.toUpperCase() : text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default NavLinks;
