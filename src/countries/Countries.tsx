import { graphql, useLazyLoadQuery } from "react-relay";
import { CountriesQuery as ICountriesQuery } from "./__generated__/CountriesQuery.graphql";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { styled, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Masonry } from "@mui/lab";
import { CountriesListItem } from "./CountriesListItem";

const CountriesQuery = graphql`
  query CountriesQuery {
    countries {
      code
      name
      ...CountriesListItem_country
    }
  }
`;

export const Countries = () => {
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isUpperSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isUpperMd = useMediaQuery(theme.breakpoints.up("md"));
  const isUpperLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isUpperXl = useMediaQuery(theme.breakpoints.up("xl"));

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
          // Must use div to get mansory working. Using forwardRef on child component doesnt work
          <div key={country.code}>
            <CountriesListItem countryRef={country} />
          </div>
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
