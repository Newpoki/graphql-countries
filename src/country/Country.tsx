import { getFlagAlt } from "@/utils/getFlagAlt";
import { Box, Button, styled, Theme, Typography } from "@mui/material";
import { useLazyLoadQuery } from "react-relay";
import { Link, useParams } from "react-router-dom";
import { graphql } from "relay-runtime";
import { CountryLink } from "./CountryLink";
import { CountryQuery as ICountryQuery } from "./__generated__/CountryQuery.graphql";

const CountryQuery = graphql`
  query CountryQuery($code: ID!) {
    country(code: $code) {
      name
      code
      native
      phone
      continent {
        code
        name
        countries {
          code
        }
      }
      capital
      currency
      languages {
        code
        name
      }
      emoji
      emojiU
      states {
        code
      }
    }
  }
`;

const styles = {
  label: (theme: Theme) => ({
    fontWeight: theme.typography.fontWeightBold,
  }),

  dataAndWikipediaLink: (theme: Theme) => ({
    width: "100%",
    maxWidth: "450px",
    margin: "0 auto",
    padding: {
      xs: theme.spacing(4),
      sm: theme.spacing(2),
    },
  }),
  data: (theme: Theme) => ({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridRowGap: theme.spacing(2),
    margin: "0 auto",
    marginTop: theme.spacing(4),
  }),

  backButton: () => ({
    mt: 4,
  }),
};

export const Country = () => {
  const { countryId } = useParams();

  const { country } = useLazyLoadQuery<ICountryQuery>(
    CountryQuery,
    { code: countryId ?? "" },
    { fetchPolicy: countryId ? "store-or-network" : "store-only" }
  );

  return (
    <div>
      <Typography component="h1" variant="h2" align="center" my={2}>
        {country?.name}
      </Typography>
      <Flag
        src={`https://countryflagsapi.com/svg/${country?.code}`}
        alt={getFlagAlt(country?.name)}
      />

      <Box sx={styles.dataAndWikipediaLink}>
        <Box sx={styles.data}>
          <Typography sx={styles.label}>Name</Typography>
          <CountryLink href={`https://wikipedia.org/wiki/${country?.name}`}>
            {country?.name}
          </CountryLink>
          <Typography sx={styles.label}>Phone indicator</Typography>
          <Typography align="right">+{country?.phone}</Typography>
          <Typography sx={styles.label}>Capital</Typography>
          <CountryLink href={`https://wikipedia.org/wiki/${country?.capital}`}>
            {country?.capital}
          </CountryLink>
          <Typography sx={styles.label}>Currency</Typography>
          <Typography align="right">{country?.currency}</Typography>
          <Typography sx={styles.label}>Languages</Typography>
          <Typography align="right">
            {country?.languages.map((language) => (
              <LanguageCountryLink
                key={language.name}
                href={`https://wikipedia.org/wiki/${language.name}_language`}
              >
                {language.name}
              </LanguageCountryLink>
            ))}
          </Typography>
        </Box>

        <Button variant="contained" component={Link} to="/countries" sx={styles.backButton}>
          Return to list
        </Button>
      </Box>
    </div>
  );
};

const Flag = styled("img")`
  display: flex;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
`;

const LanguageCountryLink = styled(CountryLink)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
