import { graphql, useLazyLoadQuery } from "react-relay";
import { Link } from "react-router-dom";
import { CountriesQuery as ICountriesQuery } from "./__generated__/CountriesQuery.graphql";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { styled } from "@mui/material";

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

  const { countries } = useLazyLoadQuery<ICountriesQuery>(
    CountriesQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );

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
      <SearchInput value={search} onChange={handleSearch} />

      <CountriesList>
        {filteredCountries.map((country) => (
          <Link key={country.code} to={`/countries/${country.code}`}>
            <img
              src={`https://countryflagsapi.com/svg/${country.code}`}
              style={{ width: "100%" }}
            />
          </Link>
        ))}
      </CountriesList>
    </Root>
  );
};

const Root = styled("div")`
  padding: 32px;
  /* height: 100vh; */
`;

const CountriesList = styled("ul")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: ${({ theme }) => theme.spacing(4)};
  grid-column-gap: ${({ theme }) => theme.spacing(4)};
  padding: 0;
  overflow-y: auto;
`;

const SearchInput = styled("input")`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  width: 100%;
  height: 32px;
`;
