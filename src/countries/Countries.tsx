import { graphql, useLazyLoadQuery } from "react-relay";
import { Link } from "react-router-dom";
import { CountriesQuery as ICountriesQuery } from "./__generated__/CountriesQuery.graphql";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { alpha, ButtonBase, styled, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Masonry } from "@mui/lab";

const CountriesQuery = graphql`
  query CountriesQuery {
    countries {
      name
      code
    }
  }
`;

export const Countries = () => {
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isUpperSm = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const isUpperMd = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  const isUpperLg = useMediaQuery(theme.breakpoints.up("lg"), { noSsr: true });
  const isUpperXl = useMediaQuery(theme.breakpoints.up("xl"), { noSsr: true });

  const { countries } = useLazyLoadQuery<ICountriesQuery>(
    CountriesQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );

  const masonryColumnsNumber = useMemo(() => {
    if (isUpperXl) {
      return 8;
    }

    if (isUpperLg) {
      return 6;
    }

    if (isUpperMd) {
      return 4;
    }

    if (isUpperSm) {
      return 2;
    }

    return 1;
  }, [isUpperLg, isUpperMd, isUpperSm, isUpperXl]);

  const filteredCountries = useMemo(() => {
    if (search.length <= 2) {
      return countries;
    }

    return countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));
  }, [countries, search]);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  return (
    <Root>
      <SearchWrapper>
        <TextField
          value={search}
          onChange={handleSearch}
          variant="outlined"
          color="primary"
          label="Search..."
          inputProps={{ "aria-label": "search" }}
        />
      </SearchWrapper>

      <Masonry columns={masonryColumnsNumber} spacing={3}>
        {filteredCountries.map((country) => (
          <CountryItem key={country.code}>
            <CountryItemBackdrop className="backdrop">{country.name}</CountryItemBackdrop>

            <CountryItemFlagWrapper>
              <CountryItemFlag
                className="blur-item"
                src={`https://countryflagsapi.com/svg/${country.code}`}
              />
            </CountryItemFlagWrapper>
          </CountryItem>
        ))}
      </Masonry>
    </Root>
  );
};

const Root = styled("div")`
  padding: ${({ theme }) => theme.spacing(8)};
`;

const SearchWrapper = styled("div")`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const CountryItem = styled(ButtonBase)`
  position: relative;

  &:hover {
    & .blur-item {
      filter: blur(4px);
    }

    & .backdrop {
      opacity: 1;
    }
  }
`;

const CountryItemBackdrop = styled("div")`
  background-color: ${({ theme }) => alpha(theme.palette.background.paper, 0.4)};
  position: absolute;
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`;

const CountryItemFlagWrapper = styled("div")`
  overflow: hidden;
`;

const CountryItemLink = styled(Link)``;

const CountryItemFlag = styled("img")`
  width: 100%;
`;
