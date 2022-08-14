import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";

const CountryQuery = graphql`
  query CountryQuery($code: ID!) {
    country(code: $code) {
      name
      native
    }
  }
`;

export const Country = () => {
  const data = useLazyLoadQuery(CountryQuery, { code: "BR" }, { fetchPolicy: "store-or-network" });

  console.log({ data });
  return <div>pouet</div>;
};
