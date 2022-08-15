import { getFlagAlt } from "@/utils/getFlagAlt";
import { Box, Button, styled, Theme, Typography } from "@mui/material";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import { graphql } from "relay-runtime";
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
  wikipediaLink: () => ({
    mt: 2,
    display: "flex",
    justifyContent: "flex-end",
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
          <Typography align="right">{country?.native}</Typography>
          <Typography sx={styles.label}>Phone indicator</Typography>
          <Typography align="right">+{country?.phone}</Typography>
          <Typography sx={styles.label}>Capital</Typography>
          <Typography align="right">{country?.capital}</Typography>
          <Typography sx={styles.label}>Currency</Typography>
          <Typography align="right">{country?.currency}</Typography>
          <Typography sx={styles.label}>Languages</Typography>
          <Typography align="right">
            {country?.languages.map((language) => language.name).join(", ")}.
          </Typography>
        </Box>

        <Box sx={styles.wikipediaLink}>
          <Button
            variant="contained"
            color="primary"
            component="a"
            href={`https://wikipedia.org/wiki/${country?.name}`}
            target="_blank"
            rel="noreferer noreferrer"
            sx={styles.wikipediaLink}
          >
            Go to wikipedia
          </Button>
        </Box>
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
