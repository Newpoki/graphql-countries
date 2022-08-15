import { Theme, Typography } from "@mui/material";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { OpenInNew as OpenInNewIcon } from "@mui/icons-material";

type ICountryLinkProps = {
  children: ReactNode;
  className?: string;
  href: AnchorHTMLAttributes<HTMLAnchorElement>["href"];
};

const styles = {
  root: (theme: Theme) => ({
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "flex-end",
    cursor: "pointer",
    color: theme.palette.primary.main,

    "&:hover": {
      textDecoration: "underline",
    },
  }),

  icon: (theme: Theme) => ({
    width: theme.typography.body1,
    mr: 1,
  }),
};

export const CountryLink = ({ className, children, href }: ICountryLinkProps) => {
  return (
    <Typography
      className={className}
      align="right"
      sx={styles.root}
      component="a"
      href={href}
      target="_blank"
      rel="noreferer noreferrer"
    >
      <OpenInNewIcon sx={styles.icon} />
      {children}
    </Typography>
  );
};
