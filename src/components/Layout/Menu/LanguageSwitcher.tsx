import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { findLangName, getUrlWithoutLang } from "utils";
import { SUPPORTED_LANGS } from "utils/constants";
import { cx } from "utils/cx";

interface LanguageSwitcherProps {
  buttonClassName?: string;
  selectedClassName: string;
}

// Renders one list item per language; the parent supplies the <List>.
const LanguageSwitcher = ({
  buttonClassName,
  selectedClassName,
}: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const urlWithoutLang = getUrlWithoutLang(pathname);

  return (
    <>
      {SUPPORTED_LANGS.map((lang) => {
        const isSelected = i18n.language.toUpperCase() === lang.toUpperCase();
        return (
          <ListItem key={lang}>
            <ListItemButton
              component={Link}
              to={`/${lang}${urlWithoutLang}`}
              className={cx(buttonClassName, isSelected && selectedClassName)}
            >
              <ListItemText
                primary={
                  <Typography fontWeight={700}>{findLangName(lang)}</Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
};

export default LanguageSwitcher;
