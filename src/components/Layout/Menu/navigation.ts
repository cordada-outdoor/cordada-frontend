export interface NavItem {
  label: string;
  path: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "home", path: "/" },
  { label: "projects", path: "/projects" },
  { label: "services", path: "/services" },
  { label: "us", path: "/about" },
];

export const LEGAL_NAV: NavItem[] = [
  { label: "legalNotice", path: "/legal-notice" },
  { label: "privacyPolicy", path: "/privacy-policy" },
];
