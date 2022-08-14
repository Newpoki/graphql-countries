import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import { graphql } from "relay-runtime";
import { CountryQuery as ICountryQuery } from "./__generated__/CountryQuery.graphql";

const CountryQuery = graphql`
  query CountryQuery($code: ID!) {
    country(code: $code) {
      code
      name
      native
    }
  }
`;

export const Country = () => {
  const { countryId } = useParams();

  const { country } = useLazyLoadQuery<ICountryQuery>(
    CountryQuery,
    { code: countryId ?? "" },
    { fetchPolicy: countryId ? "store-or-network" : "store-only" }
  );

  return (
    <div>
      <h1>{country?.name}</h1>
      <img src={`https://countryflagsapi.com/svg/${country?.code}`} />
    </div>
  );
};
