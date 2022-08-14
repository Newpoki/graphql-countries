import {
  COUNTRY_ITEM_BACKDROP_CLASSNAME,
  COUNTRY_ITEM_FLAG_CLASSNAME,
} from "./countries-constants";
import { alpha, ButtonBase, styled, Typography } from "@mui/material";
import { graphql, useFragment } from "react-relay";
import { CountriesListItem_country$key } from "./__generated__/CountriesListItem_country.graphql";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type ICountriesListItem = {
  countryRef: CountriesListItem_country$key;
};

const countryFragment = graphql`
  fragment CountriesListItem_country on Country {
    name
    code
  }
`;

export const CountriesListItem = ({ countryRef }: ICountriesListItem) => {
  const country = useFragment<CountriesListItem_country$key>(countryFragment, countryRef);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/countries/${country.code}`);
  }, [country.code, navigate]);

  return (
    <CountryItem key={country.code} onClick={handleClick}>
      <CountryItemBackdrop className={COUNTRY_ITEM_BACKDROP_CLASSNAME}>
        <Typography>{country.name}</Typography>
      </CountryItemBackdrop>

      <CountryItemFlagWrapper>
        <CountryItemFlag
          className={COUNTRY_ITEM_FLAG_CLASSNAME}
          src={`https://countryflagsapi.com/svg/${country.code}`}
        />
      </CountryItemFlagWrapper>
    </CountryItem>
  );
};

const CountryItem = styled(ButtonBase)`
  position: relative;

  &:hover {
    & .${COUNTRY_ITEM_FLAG_CLASSNAME} {
      filter: blur(4px);
    }

    & .${COUNTRY_ITEM_BACKDROP_CLASSNAME} {
      opacity: 1;
    }
  }
`;

const CountryItemBackdrop = styled("div")`
  background-color: ${({ theme }) => alpha(theme.palette.background.paper, 0.4)};
  position: absolute;
  /* To display the text above img */
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: ${({ theme }) =>
    theme.transitions.create(["background-color", "opacity"], {
      duration: theme.transitions.duration.short,
    })};
`;

const CountryItemFlagWrapper = styled("div")`
  overflow: hidden;
`;

const CountryItemFlag = styled("img")`
  width: 100%;
  /* Hacks to make the img take full height of its container */
  display: block;
  filter: blur(0);
  transition: ${({ theme }) =>
    theme.transitions.create(["filter"], { duration: theme.transitions.duration.short })};
`;
